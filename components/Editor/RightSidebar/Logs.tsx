import {
  useEffect,
  useState,
} from 'react'
import hljs from 'highlight.js'
import ReactMarkdown from 'react-markdown'

import Text from 'components/Text'
import { useTabs } from 'components/Tabs/useTabs'
import Tabs from 'components/Tabs'
import { Log } from 'db/types'

export interface Props {
  logs?: Log[]
  logsRaw?: string
}

function Logs({
  logs,
  logsRaw,
}: Props) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [tabsProps] = useState({
    tabs: [
      {
        label: 'Pretty',
        id: 'pretty',
      },
      {
        label: 'Raw',
        id: 'raw',
      },
    ]
  })

  const tabsCss = useTabs(tabsProps)

  useEffect(function highlightCode() {
    if (selectedTab === 1) {
      hljs.highlightAll()
    }
  }, [logs, selectedTab])

  return (
    <div className="
      max-w-full
      flex
      flex-col
      overflow-auto
    ">
      <div className="
        flex
        items-center
        justify-between
        border-b
        py-2
      ">
        <Text
          text="Logs"
          size={Text.size.S2}
          className="
            uppercase
            text-slate-400
            font-semibold
            px-4
          "
        />

        {process.env.NODE_ENV === 'development' && (
          <Tabs
            {...tabsCss.tabProps}
            selectedTabIndex={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        )}
      </div>

      <div
        className="
          flex-1
          overflow-auto
          text-xs
          tracking-wide
          font-sans
          whitespace-pre-wrap
          space-y-4
          p-4
      ">
        {selectedTab === 0 && (
          <>
            {logs?.map((l, i) =>
              <ReactMarkdown key={i}>
                {l}
              </ReactMarkdown>
            )}
          </>
        )}
        {selectedTab === 1 && (
          <>
            {logsRaw &&
              <ReactMarkdown>
                {logsRaw}
              </ReactMarkdown>
            }
          </>
        )}
      </div>
    </div>
  )
}

export default Logs