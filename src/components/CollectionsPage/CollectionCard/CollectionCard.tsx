import * as React from 'react'
import { DropTarget } from 'react-dnd'
import { Link } from 'react-router-dom'
import { Button, Card, Confirm } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import CollectionBadge from 'components/CollectionBadge'
import CollectionImage from 'components/CollectionImage'
import { locations } from 'routing/locations'
import { OptionsDropdown } from '../OptionsDropdown'
import { ITEM_DASHBOARD_CARD_SOURCE } from '../ItemCard/ItemCard.dnd'
import { collect, CollectedProps, collectionTarget } from './CollectionCard.dnd'
import { Props } from './CollectionCard.types'
import './CollectionCard.css'

const CollectionCard = (props: Props & CollectedProps) => {
  const { collection, onDeleteCollection, items, connectDropTarget, isOver, canDrop } = props
  const [isDeleting, setIsDeleting] = React.useState(false)
  const handleCancelDeleteCollection = React.useCallback(() => setIsDeleting(false), [setIsDeleting])
  const handleDeleteConfirmation = React.useCallback(() => setIsDeleting(true), [setIsDeleting])

  return (
    <>
      {connectDropTarget(
        <div className={`CollectionCard is-card ${isOver && canDrop ? 'is-over' : ''}`}>
          <OptionsDropdown
            className={'options-dropdown'}
            options={[{ text: t('home_page.collection_actions.delete'), handler: handleDeleteConfirmation }]}
          />
          <Link to={locations.collectionDetail(collection.id)}>
            <CollectionImage collection={collection} />
            <Card.Content>
              <div className="text" title={collection.name}>
                {collection.name} <CollectionBadge collection={collection} />
              </div>
              <div className="subtitle">{t('collection_card.subtitle', { count: items.length })}</div>
            </Card.Content>
          </Link>
        </div>
      )}
      <Confirm
        size="tiny"
        open={isDeleting}
        header={t('collection_card.confirm_delete_header', { name: collection.name })}
        content={t('collection_card.confirm_delete_content', { name: collection.name })}
        confirmButton={<Button primary>{t('global.confirm')}</Button>}
        cancelButton={<Button secondary>{t('global.cancel')}</Button>}
        onCancel={handleCancelDeleteCollection}
        onConfirm={onDeleteCollection}
      />
    </>
  )
}

export default DropTarget<Props, CollectedProps>(ITEM_DASHBOARD_CARD_SOURCE, collectionTarget, collect)(React.memo(CollectionCard))
