"use client"

import {
  type ComponentProps,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react"
import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs"
import { useMergedRefs } from "@base-ui-components/utils/useMergedRefs"
import { useEffectEvent } from "fumadocs-core/utils/use-effect-event"

type ChangeListener = (v: string) => void
const listeners = new Map<string, ChangeListener[]>()

function addChangeListener(id: string, listener: ChangeListener): void {
  const list = listeners.get(id) ?? []
  list.push(listener)
  listeners.set(id, list)
}

function removeChangeListener(id: string, listener: ChangeListener): void {
  const list = listeners.get(id) ?? []
  listeners.set(
    id,
    list.filter((item) => item !== listener)
  )
}

export interface TabsProps extends ComponentProps<typeof TabsPrimitive.Root> {
  /**
   * Identifier for Sharing value of tabs
   */
  groupId?: string

  /**
   * Enable persistent
   */
  persist?: boolean

  /**
   * If true, updates the URL hash based on the tab's id
   */
  updateAnchor?: boolean
}

const TabsContext = createContext<{
  valueToIdMap: Map<string, string>
} | null>(null)

function useTabContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error("You must wrap your component in <Tabs>")
  return ctx
}

export const TabsList = TabsPrimitive.List
export const TabsTrigger = TabsPrimitive.Tab

export const Tabs = forwardRef<React.ForwardedRef<Element>, TabsProps>(
  function Tabs(
    {
      groupId = "package_install",
      persist = true,
      updateAnchor = false,
      defaultValue,
      value: _value,
      onValueChange: _onValueChange,
      ...props
    },
    ref
  ) {
    const tabsRef = useRef<HTMLDivElement>(null)
    const isControlled = _value !== undefined
    // eslint-disable-next-line react-hooks/rules-of-hooks -- not supposed to change controlled/uncontrolled
    const [internalValue, setInternalValue] = useState(defaultValue)
    const value = isControlled ? _value : internalValue
    const mergedRef = useMergedRefs(ref, tabsRef as any)

    const onChange = useEffectEvent((v: string) => {
      if (isControlled) {
        _onValueChange?.(v, {
          reason: "none",
          event: new Event("change"),
          cancel: () => undefined,
          allowPropagation: () => undefined,
          isCanceled: false,
          isPropagationAllowed: true,
        })
      } else {
        setInternalValue(v)
      }
    })
    const valueToIdMap = useMemo(() => new Map<string, string>(), [])

    useLayoutEffect(() => {
      if (!groupId) return
      const previous = persist
        ? localStorage.getItem(groupId)
        : sessionStorage.getItem(groupId)

      if (previous) onChange(previous)
      addChangeListener(groupId, onChange)
      return () => {
        removeChangeListener(groupId, onChange)
      }
    }, [groupId, onChange, persist])

    useLayoutEffect(() => {
      const hash = window.location.hash.slice(1)
      if (!hash) return

      for (const [value, id] of valueToIdMap.entries()) {
        if (id === hash) {
          onChange(value)
          tabsRef.current?.scrollIntoView()
          break
        }
      }
    }, [onChange, valueToIdMap])

    return (
      <TabsPrimitive.Root
        ref={mergedRef as any}
        value={value}
        onValueChange={(v: string) => {
          if (updateAnchor) {
            const id = valueToIdMap.get(v)

            if (id) {
              window.history.replaceState(null, "", `#${id}`)
            }
          }

          if (groupId) {
            listeners.get(groupId)?.forEach((item) => {
              item(v)
            })

            if (persist) localStorage.setItem(groupId, v)
            else sessionStorage.setItem(groupId, v)
          } else {
            setInternalValue(v)
          }
        }}
        {...props}
      >
        <TabsContext.Provider
          value={useMemo(() => ({ valueToIdMap }), [valueToIdMap])}
        >
          {props.children}
        </TabsContext.Provider>
      </TabsPrimitive.Root>
    )
  }
)

export function TabsContent({
  value,
  ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
  const { valueToIdMap } = useTabContext()

  if (props.id) {
    valueToIdMap.set(value, props.id)
  }

  return (
    <TabsPrimitive.Panel value={value} {...props}>
      {props.children}
    </TabsPrimitive.Panel>
  )
}
