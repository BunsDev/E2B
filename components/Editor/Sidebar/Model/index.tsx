import { useRouter } from 'next/router'
import { Key } from 'lucide-react'

import Text from 'components/Text'
import { useStateStore } from 'state/StoreProvider'
import { getMissingCreds, ModelProvider, models } from 'state/model'
import useModelProviderCreds from 'hooks/useModelProviderCreds'
import Button from 'components/Button'

import ModelCard from './ModelCard'

export interface Props { }

function Model({ }: Props) {
  const [selector] = useStateStore()
  const router = useRouter()

  const model = selector.use.model()
  const setModel = selector.use.setModel()

  const [creds] = useModelProviderCreds()

  return (
    <div className="
      flex
      flex-col
      overflow-hidden
      ">
      <div className="
        flex
        bg-slate-50
        items-center
        justify-between
        border-b
        py-3.5
        pr-4
      ">
        <Text
          text="Model"
          size={Text.size.S2}
          className="
            uppercase
            text-slate-400
            font-semibold
            px-4
          "
        />
      </div>
      <div
        className="
        flex
        flex-1
        space-y-2
        p-4
        flex-col
        items-stretch
      "
      >
        {Object.entries(models).map(([provider, value]) =>
          <div
            key={provider}
            className="
              flex
              space-y-1
              flex-col
            "
          >
            <div className="
              flex
              space-y-1
              justify-between
            "
            >
              <Text
                text={provider}
                className="
                font-semibold
                text-slate-400
            "
                size={Text.size.S2}
              />
              {value.creds &&
                <div
                  className="
                  space-x-2
                  flex
                "
                >

                  <Text
                    text={getMissingCreds(provider as ModelProvider, creds).length === 0 ? '' : 'Missing keys'}
                    className="
                  text-red-600
                  "
                    size={Text.size.S3}
                  />
                  <Button
                    icon={
                      <Key size="16px" />
                    }
                    text="Set keys"
                    className="whitespace-pre-wrap"
                    onClick={() => router.push('/settings')}
                  />
                </div>
              }
            </div>
            <div className="
              flex
              items-stretch
              flex-col
              flex-1
              py-1
              space-y-2
            "
            >
              {value.models.map(m =>
                <ModelCard
                  key={m.name}
                  model={m}
                  modelInfo={m.name === model.name ? model : undefined}
                  isSelected={m.name === model.name}
                  select={i => setModel({
                    name: m.name,
                    provider: provider as ModelProvider,
                    ...i,
                  })}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Model