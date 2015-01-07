<?php
/**
 * @link http://buildwithcraft.com/
 * @copyright Copyright (c) 2013 Pixel & Tonic, Inc.
 * @license http://buildwithcraft.com/license
 */

namespace craft\app\services;

use craft\app\Craft;
use yii\base\Component;
use craft\app\helpers\StringHelper;
use craft\app\models\AssetIndexData     as AssetIndexDataModel;
use craft\app\models\AssetSource        as AssetSourceModel;
use craft\app\records\AssetFolder       as AssetFolderRecord;
use craft\app\records\AssetIndexData    as AssetIndexDataRecord;
use craft\app\web\Application;

/**
 * Class AssetIndexing service.
 *
 * An instance of the AssetIndexing service is globally accessible in Craft via [[Application::assetIndexing `Craft::$app->assetIndexing`]].
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 3.0
 */
class AssetIndexing extends Component
{
	// Public Methods
	// =========================================================================

	/**
	 * Returns a unique indexing session id.
	 *
	 * @return string
	 */
	public function getIndexingSessionId()
	{
		return StringHelper::UUID();
	}

	/**
	 * Gets index list for a source.
	 *
	 * @param $sessionId
	 * @param $sourceId
	 *
	 * @return array
	 */
	public function getIndexListForSource($sessionId, $sourceId)
	{
		return Craft::$app->assetSources->getSourceTypeById($sourceId)->startIndex($sessionId);
	}

	/**
	 * Process index for a source.
	 *
	 * @param $sessionId
	 * @param $offset
	 * @param $sourceId
	 *
	 * @return mixed
	 */
	public function processIndexForSource($sessionId, $offset, $sourceId)
	{
		return array('result' => Craft::$app->assetSources->getSourceTypeById($sourceId)->processIndex($sessionId, $offset));
	}

	/**
	 * Ensures a top level folder exists that matches the model.
	 *
	 * @param AssetSourceModel $model
	 *
	 * @return int
	 */
	public function ensureTopFolder(AssetSourceModel $model)
	{
		$folder = AssetFolderRecord::model()->findByAttributes(
			array(
				'name' => $model->name,
				'sourceId' => $model->id
			)
		);

		if (empty($folder))
		{
			$folder = new AssetFolderRecord();
			$folder->sourceId = $model->id;
			$folder->parentId = null;
			$folder->name = $model->name;
			$folder->path = '';
			$folder->save();
		}

		return $folder->id;
	}

	/**
	 * Store an index entry.
	 *
	 * @param $data
	 */
	public function storeIndexEntry($data)
	{
		$entry = new AssetIndexDataRecord();

		foreach ($data as $key => $value)
		{
			$entry->setAttribute($key, $value);
		}

		$entry->save();
	}

	/**
	 * Return an index model.
	 *
	 * @param $sourceId
	 * @param $sessionId
	 * @param $offset
	 *
	 * @return AssetIndexDataModel|bool
	 */
	public function getIndexEntry($sourceId, $sessionId, $offset)
	{
		$record = AssetIndexDataRecord::model()->findByAttributes(
			array(
				'sourceId' => $sourceId,
				'sessionId' => $sessionId,
				'offset' => $offset
			)
		);

		if ($record)
		{
			return AssetIndexDataModel::populateModel($record);
		}

		return false;
	}

	/**
	 * @param $entryId
	 * @param $recordId
	 *
	 * @return null
	 */
	public function updateIndexEntryRecordId($entryId, $recordId)
	{
		Craft::$app->db->createCommand()->update('assetindexdata', array('recordId' => $recordId), array('id' => $entryId));
	}


	/**
	 * Return a list of missing files for an indexing session.
	 *
	 * @param $sources
	 * @param $sessionId
	 *
	 * @return array
	 */
	public function getMissingFiles($sources, $sessionId)
	{
		$output = array();

		// Load the record IDs of the files that were indexed.
		$processedFiles = Craft::$app->db->createCommand()
			->select('recordId')
			->from('assetindexdata')
			->where('sessionId = :sessionId AND recordId IS NOT NULL', array(':sessionId' => $sessionId))
			->queryColumn();

		$processedFiles = array_flip($processedFiles);

		$fileEntries = Craft::$app->db->createCommand()
			->select('fi.sourceId, fi.id AS fileId, fi.filename, fo.path, s.name AS sourceName')
			->from('assetfiles AS fi')
			->join('assetfolders AS fo', 'fi.folderId = fo.id')
			->join('assetsources AS s', 's.id = fi.sourceId')
			->where(array('in', 'fi.sourceId', $sources))
			->queryAll();

		foreach ($fileEntries as $fileEntry)
		{
			if (!isset($processedFiles[$fileEntry['fileId']]))
			{
				$output[$fileEntry['fileId']] = $fileEntry['sourceName'].'/'.$fileEntry['path'].$fileEntry['filename'];
			}
		}

		return $output;
	}

	/**
	 * Remove obsolete file records.
	 *
	 * @param $fileIds
	 *
	 * @return null
	 */
	public function removeObsoleteFileRecords($fileIds)
	{
		Craft::$app->db->createCommand()->delete('assettransformindex', array('in', 'fileId', $fileIds));
		Craft::$app->db->createCommand()->delete('assetfiles', array('in', 'id', $fileIds));

		foreach ($fileIds as $fileId)
		{
			Craft::$app->elements->deleteElementById($fileId);
		}
	}

	/**
	 * Remove obsolete folder records.
	 *
	 * @param $folderIds
	 *
	 * @return null
	 */
	public function removeObsoleteFolderRecords($folderIds)
	{
		Craft::$app->db->createCommand()->delete('assetfolders', array('in', 'id', $folderIds));
	}

}
