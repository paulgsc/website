import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef, useEffect, useRef } from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { createContextScope } from "@radix-ui/react-context"
import type { Scope } from "@radix-ui/react-context"
import { useDirection } from "@radix-ui/react-direction"
import { useId } from "@radix-ui/react-id"
import { Presence } from "@radix-ui/react-presence"
import { Primitive } from "@radix-ui/react-primitive"
import { createRovingFocusGroupScope } from "@radix-ui/react-roving-focus"
import * as RovingFocusGroup from "@radix-ui/react-roving-focus"
import { useControllableState } from "@radix-ui/react-use-controllable-state"

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/

const TABS_NAME = "Tabs"

type ScopedProps<P> = P & { __scopeTabs?: Scope }
const [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope,
])
const useRovingFocusGroupScope = createRovingFocusGroupScope()

type TabsContextValue = {
  baseId: string
  value?: string

  onValueChange: (value: string) => void
  orientation?: TabsProps["orientation"]
  dir?: TabsProps["dir"]
  activationMode?: TabsProps["activationMode"]
}

const [TabsProvider, useTabsContext] =
  createTabsContext<TabsContextValue>(TABS_NAME)

type TabsElement = ElementRef<typeof Primitive.div>
type RovingFocusGroupProps = ComponentPropsWithoutRef<
  typeof RovingFocusGroup.Root
>
type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>
type TabsProps = {
  /** The value for the selected tab, if controlled */
  value?: string
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string
  /** A function called when a new tab is selected */

  onValueChange?: (value: string) => void
  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: RovingFocusGroupProps["orientation"]
  /**
   * The direction of navigation between toolbar items.
   */
  dir?: RovingFocusGroupProps["dir"]
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   * */
  activationMode?: "automatic" | "manual"
} & PrimitiveDivProps

const Tabs = forwardRef<TabsElement, TabsProps>(
  (props: ScopedProps<TabsProps>, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props
    const direction = useDirection(dir)
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue,
    })

    return (
      <TabsProvider
        scope={__scopeTabs}
        baseId={useId()}
        value={value}
        onValueChange={setValue}
        orientation={orientation}
        dir={direction}
        activationMode={activationMode}
      >
        <Primitive.div
          dir={direction}
          data-orientation={orientation}
          {...tabsProps}
          ref={forwardedRef}
        />
      </TabsProvider>
    )
  }
)

Tabs.displayName = TABS_NAME

/* -------------------------------------------------------------------------------------------------
 * TabsList
 * -----------------------------------------------------------------------------------------------*/

const TAB_LIST_NAME = "TabsList"

type TabsListElement = ElementRef<typeof Primitive.div>
type TabsListProps = {
  loop?: RovingFocusGroupProps["loop"]
  value?: string
} & PrimitiveDivProps

const TabsList = forwardRef<TabsListElement, TabsListProps>(
  (props: ScopedProps<TabsListProps>, forwardedRef) => {
    const { __scopeTabs, loop = true, value, ...listProps } = props
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs)
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs)
    const isSelected = value === context.value
    return (
      <RovingFocusGroup.Root
        asChild
        {...rovingFocusGroupScope}
        orientation={context.orientation}
        dir={context.dir}
        loop={loop}
      >
        <Primitive.div
          role="tablist"
          aria-orientation={context.orientation}
          data-state={isSelected ? "active" : "inactive"}
          {...listProps}
          ref={forwardedRef}
        />
      </RovingFocusGroup.Root>
    )
  }
)

TabsList.displayName = TAB_LIST_NAME

/* -------------------------------------------------------------------------------------------------
 * TabsTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = "TabsTrigger"

type TabsTriggerElement = ElementRef<typeof Primitive.button>
type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof Primitive.button>
type TabsTriggerProps = {
  value: string
} & PrimitiveButtonProps

const TabsTrigger = forwardRef<TabsTriggerElement, TabsTriggerProps>(
  (props: ScopedProps<TabsTriggerProps>, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs)
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs)
    const triggerId = makeTriggerId(context.baseId, value)
    const contentId = makeContentId(context.baseId, value)
    const isSelected = value === context.value
    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable={!disabled}
        active={isSelected}
      >
        <Primitive.button
          type="button"
          role="tab"
          aria-selected={isSelected}
          aria-controls={contentId}
          data-state={isSelected ? "active" : "inactive"}
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          id={triggerId}
          {...triggerProps}
          ref={forwardedRef}
          onMouseDown={composeEventHandlers(props.onMouseDown, (event) => {
            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              context.onValueChange(value)
            } else {
              // prevent focus to avoid accidental activation
              event.preventDefault()
            }
          })}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if ([" ", "Enter"].includes(event.key)) context.onValueChange(value)
          })}
          onFocus={composeEventHandlers(props.onFocus, () => {
            // handle "automatic" activation if necessary
            // ie. activate tab following focus
            const isAutomaticActivation = context.activationMode !== "manual"
            if (!isSelected && !disabled && isAutomaticActivation) {
              context.onValueChange(value)
            }
          })}
        />
      </RovingFocusGroup.Item>
    )
  }
)

TabsTrigger.displayName = TRIGGER_NAME

/* -------------------------------------------------------------------------------------------------
 * TabsContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = "TabsContent"

type TabsContentElement = ElementRef<typeof Primitive.div>
type TabsContentProps = {
  value: string
  applyPresence?: boolean

  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
} & PrimitiveDivProps

const TabsContent = forwardRef<TabsContentElement, TabsContentProps>(
  (props: ScopedProps<TabsContentProps>, forwardedRef) => {
    const {
      __scopeTabs,
      value,
      forceMount,
      applyPresence = false,
      children,
      ...contentProps
    } = props
    const context = useTabsContext(CONTENT_NAME, __scopeTabs)
    const triggerId = makeTriggerId(context.baseId, value)
    const contentId = makeContentId(context.baseId, value)
    const isSelected = value === context.value
    const isMountAnimationPreventedRef = useRef(isSelected)

    useEffect(() => {
      const rAF = requestAnimationFrame(
        () => (isMountAnimationPreventedRef.current = false)
      )
      return () => cancelAnimationFrame(rAF)
    }, [])

    return (
      <Presence present={forceMount || isSelected}>
        {({ present }) => (
          <Primitive.div
            data-state={isSelected ? "active" : "inactive"}
            data-orientation={context.orientation}
            role="tabpanel"
            aria-labelledby={triggerId}
            id={contentId}
            tabIndex={0}
            {...contentProps}
            ref={forwardedRef}
            style={{
              ...props.style,
              animationDuration: isMountAnimationPreventedRef.current
                ? "0s"
                : undefined,
            }}
          >
            {applyPresence ? present && children : children}
          </Primitive.div>
        )}
      </Presence>
    )
  }
)

TabsContent.displayName = CONTENT_NAME

/* ---------------------------------------------------------------------------------------------- */

function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`
}

function makeContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`
}

const Root = Tabs
const List = TabsList
const Trigger = TabsTrigger
const Content = TabsContent

export {
  createTabsScope,
  //
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  //
  Root,
  List,
  Trigger,
  Content,
}
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps }
