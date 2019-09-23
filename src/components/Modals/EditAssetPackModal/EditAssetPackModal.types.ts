import { Dispatch } from 'redux'
import { FullAssetPack, MixedAssetPack } from 'modules/assetPack/types'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import {
  saveAssetPackRequest,
  SaveAssetPackRequestAction,
  deleteAssetPackRequest,
  DeleteAssetPackRequestAction
} from 'modules/assetPack/actions'
import { AssetPackState } from 'modules/assetPack/reducer'
import { Project } from 'modules/project/types'
import { login, LoginAction } from 'modules/auth/actions'

export enum EditAssetPackView {
  IMPORT,
  EDIT_ASSETS,
  EDIT_ASSET_PACK,
  PROGRESS,
  SUCCESS,
  EXIT,
  CONFIRM_DELETE
}

export type State = {
  view: EditAssetPackView
  back: EditAssetPackView
  assetPack: MixedAssetPack
  editingAsset: string | null
  ignoredAssets: string[]
}

export type Props = ModalProps & {
  project: Project | null
  progress: AssetPackState['progress']
  error: AssetPackState['error']
  assetPack: FullAssetPack | undefined
  userId: string | null
  isLoading: boolean
  onCreateAssetPack: typeof saveAssetPackRequest
  onDeleteAssetPack: typeof deleteAssetPackRequest
  onLogin: typeof login
}

export type OwnProps = Pick<Props, 'metadata'>
export type MapStateProps = Pick<Props, 'project' | 'progress' | 'error' | 'assetPack' | 'userId' | 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onCreateAssetPack' | 'onLogin' | 'onDeleteAssetPack'>
export type MapDispatch = Dispatch<SaveAssetPackRequestAction | LoginAction | DeleteAssetPackRequestAction>
