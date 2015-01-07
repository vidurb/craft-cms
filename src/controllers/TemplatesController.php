<?php
/**
 * @link http://buildwithcraft.com/
 * @copyright Copyright (c) 2013 Pixel & Tonic, Inc.
 * @license http://buildwithcraft.com/license
 */

namespace craft\app\controllers;

use craft\app\Craft;
use craft\app\enums\InstallStatus;
use craft\app\errors\Exception;
use craft\app\errors\HttpException;
use craft\app\helpers\AppHelper;
use craft\app\helpers\TemplateHelper;
use craft\app\requirements\RequirementsChecker;

/**
 * The TemplatesController class is a controller that handles various template rendering related tasks for both the
 * control panel and front-end of a Craft site.
 *
 * Note that all actions in the controller are open to do not require an authenticated Craft session in order to execute.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 3.0
 */
class TemplatesController extends BaseController
{
	// Properties
	// =========================================================================

	/**
	 * If set to false, you are required to be logged in to execute any of the given controller's actions.
	 *
	 * If set to true, anonymous access is allowed for all of the given controller's actions.
	 *
	 * If the value is an array of action names, then you must be logged in for any action method except for the ones in
	 * the array list.
	 *
	 * If you have a controller that where the majority of action methods will be anonymous, but you only want require
	 * login on a few, it's best to call [[requireLogin()]] in the individual methods.
	 *
	 * @var bool
	 */
	public $allowAnonymous = true;

	// Public Methods
	// =========================================================================

	/**
	 * Renders a template.
	 *
	 * @param       $template
	 * @param array $variables
	 *
	 * @throws HttpException
	 * @return null
	 */
	public function actionRender($template, array $variables = array())
	{
		// Does that template exist?
		if (Craft::$app->templates->doesTemplateExist($template))
		{
			$this->renderTemplate($template, $variables);
		}
		else
		{
			throw new HttpException(404);
		}
	}

	/**
	 * Shows the 'offline' template.
	 *
	 * @return null
	 */
	public function actionOffline()
	{
		// If this is a site request, make sure the offline template exists
		if (Craft::$app->request->isSiteRequest() && !Craft::$app->templates->doesTemplateExist('offline'))
		{
			// Set the Path service to use the CP templates path instead
			Craft::$app->path->setTemplatesPath(Craft::$app->path->getCpTemplatesPath());
		}

		// Output the offline template
		$this->renderTemplate('offline');
	}

	/**
	 * Renders the Manual Update notification template.
	 *
	 * @return null
	 */
	public function actionManualUpdateNotification()
	{
		$this->renderTemplate('_special/dbupdate');
	}

	/**
	 * Renders the Manual Update template.
	 *
	 * @return null
	 */
	public function actionManualUpdate()
	{
		$this->renderTemplate('updates/_go', array(
			'handle' => Craft::$app->request->getSegment(2)
		));
	}

	/**
	 * @throws Exception
	 * @return null
	 */
	public function actionRequirementsCheck()
	{
		// Run the requirements checker
		$reqCheck = new RequirementsChecker();
		$reqCheck->run();

		if ($reqCheck->getResult() == InstallStatus::Failed)
		{
			// Coming from Updater.php
			if (Craft::$app->request->isAjaxRequest())
			{
				$message = '<br /><br />';

				foreach ($reqCheck->getRequirements() as $req)
				{
					if ($req->result == 'failed')
					{
						$message .= $req->notes.'<br />';
					}
				}

				throw new Exception(Craft::t('The update can’t be installed :( {message}', array('message' => $message)));
			}
			else
			{
				$this->renderTemplate('_special/cantrun', array('reqCheck' => $reqCheck));
				Craft::$app->end();
			}


		}
		else
		{
			// Cache the app path.
			Craft::$app->cache->set('appPath', Craft::$app->path->getAppPath());
		}
	}

	/**
	 * Renders an error template.
	 *
	 * @throws \Exception
	 * @return null
	 */
	public function actionRenderError()
	{
		$error = Craft::$app->errorHandler->getError();
		$code = (string) $error['code'];

		if (Craft::$app->request->isSiteRequest())
		{
			$prefix = Craft::$app->config->get('errorTemplatePrefix');

			if (Craft::$app->templates->doesTemplateExist($prefix.$code))
			{
				$template = $prefix.$code;
			}
			else if ($code == 503 && Craft::$app->templates->doesTemplateExist($prefix.'offline'))
			{
				$template = $prefix.'offline';
			}
			else if (Craft::$app->templates->doesTemplateExist($prefix.'error'))
			{
				$template = $prefix.'error';
			}
		}

		if (!isset($template))
		{
			Craft::$app->path->setTemplatesPath(Craft::$app->path->getCpTemplatesPath());

			if (Craft::$app->templates->doesTemplateExist($code))
			{
				$template = $code;
			}
			else
			{
				$template = 'error';
			}
		}

		try
		{
			$variables = array_merge($error);

			// Escape any inner-word underscores, which Markdown mistakes for italics
			// TODO: This won't be necessary in 3.0 thanks to Parsedown
			$variables['message'] = preg_replace('/(?<=[a-zA-Z])_(?=[a-zA-Z])/', '\_', $variables['message']);

			// If this is a PHP error and html_errors (http://php.net/manual/en/errorfunc.configuration.php#ini.html-errors)
			// is enabled, then allow the HTML not get encoded
			if (strncmp($variables['type'], 'PHP ', 4) === 0 && AppHelper::getPhpConfigValueAsBool('html_errors'))
			{
				$variables['message'] = TemplateHelper::getRaw($variables['message']);
			}

			$this->renderTemplate($template, $variables);
		}
		catch (\Exception $e)
		{
			if (YII_DEBUG)
			{
				throw $e;
			}
			else
			{
				// Just output the error message
				echo $e->getMessage();
			}
		}
	}
}
