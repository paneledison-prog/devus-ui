import { useState, type ReactNode } from 'react';
import { useOverlayRoot } from './overlayRoot';
import {
  Breadcrumb, Breadcrumbs, Button, Calendar, CalendarCell, CalendarGrid, ComboBox, DateField, DateInput, DateSegment,
  Dialog, DialogTrigger, Disclosure, DisclosureGroup, DisclosurePanel, Heading, Input, Label, ListBox, ListBoxItem,
  Menu, MenuItem, MenuTrigger, Meter, Modal, ModalOverlay, NumberField, Popover, Radio, RadioGroup, SearchField,
  Select, SelectValue, Slider, SliderOutput, SliderThumb, SliderTrack, Tab, TabList, TabPanel, Tabs, Tag, TagGroup,
  TagList, Text, ToggleButton, ToggleButtonGroup, Link, type Key,
} from 'react-aria-components';
import { parseDate } from '@internationalized/date';
import './Aria.css';

const useRoot = useOverlayRoot;

const Chevron = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 4 4 4-4" /></svg>
);
const Check = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7" /></svg>
);

export interface Option { id: string; label: string }

/* ---------- Select ---------- */
export function AriaSelect({ label, options, placeholder = 'Choose one', defaultValue }: { label: string; options: Option[]; placeholder?: string; defaultValue?: string }) {
  const root = useRoot();
  return (
    <Select className="ra-field" placeholder={placeholder} defaultSelectedKey={defaultValue}>
      <Label className="ra-label">{label}</Label>
      <Button className="ra-trigger"><SelectValue className="ra-value" /><Chevron /></Button>
      <Popover className="ra-popover" UNSTABLE_portalContainer={root}>
        <ListBox className="ra-list">
          {options.map((o) => (
            <ListBoxItem key={o.id} id={o.id} textValue={o.label} className="ra-item">
              <span>{o.label}</span><span className="ra-item__check"><Check /></span>
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}

/* ---------- Combo box ---------- */
export function AriaComboBox({ label, options, placeholder = 'Type to search' }: { label: string; options: Option[]; placeholder?: string }) {
  const root = useRoot();
  return (
    <ComboBox className="ra-field" defaultItems={options} allowsEmptyCollection>
      <Label className="ra-label">{label}</Label>
      <div className="ra-input-wrap">
        <Input className="ra-input" placeholder={placeholder} />
        <Button className="ra-input-btn" aria-label="Show suggestions"><Chevron /></Button>
      </div>
      <Popover className="ra-popover" UNSTABLE_portalContainer={root}>
        <ListBox className="ra-list" renderEmptyState={() => <div className="ra-empty">No matches</div>}>
          {(o: Option) => <ListBoxItem id={o.id} textValue={o.label} className="ra-item"><span>{o.label}</span><span className="ra-item__check"><Check /></span></ListBoxItem>}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

/* ---------- Slider ---------- */
export function AriaSlider({ label, defaultValue = 40, formatOptions }: { label: string; defaultValue?: number; formatOptions?: Intl.NumberFormatOptions }) {
  return (
    <Slider className="ra-slider" defaultValue={defaultValue} formatOptions={formatOptions}>
      <div className="ra-slider__head"><Label className="ra-label">{label}</Label><SliderOutput className="ra-slider__out" /></div>
      <SliderTrack className="ra-track">
        {({ state }) => (<>
          <div className="ra-track__bar" />
          <div className="ra-track__fill" style={{ width: `${state.getThumbPercent(0) * 100}%` }} />
          <SliderThumb className="ra-thumb" />
        </>)}
      </SliderTrack>
    </Slider>
  );
}

/* ---------- Tabs ---------- */
export interface TabDef { id: string; label: string; content: ReactNode }
export function AriaTabs({ tabs, label = 'Sections' }: { tabs: TabDef[]; label?: string }) {
  return (
    <Tabs className="ra-tabs">
      <TabList className="ra-tablist" aria-label={label}>
        {tabs.map((t) => <Tab key={t.id} id={t.id} className="ra-tab">{t.label}</Tab>)}
      </TabList>
      {tabs.map((t) => <TabPanel key={t.id} id={t.id} className="ra-tabpanel">{t.content}</TabPanel>)}
    </Tabs>
  );
}

/* ---------- Accordion ---------- */
export interface AccordionItem { id: string; title: string; body: ReactNode }
export function AriaAccordion({ items, defaultExpanded }: { items: AccordionItem[]; defaultExpanded?: string[] }) {
  return (
    <DisclosureGroup className="ra-accordion" defaultExpandedKeys={defaultExpanded}>
      {items.map((it) => (
        <Disclosure key={it.id} id={it.id} className="ra-disclosure">
          <Heading level={3} className="ra-disclosure__head">
            <Button slot="trigger" className="ra-disclosure__btn"><span>{it.title}</span><Chevron /></Button>
          </Heading>
          <DisclosurePanel className="ra-disclosure__panel"><div className="ra-disclosure__body">{it.body}</div></DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}

/* ---------- Radio group ---------- */
export interface RadioOption { id: string; label: string; description?: string }
export function AriaRadioGroup({ label, options, defaultValue }: { label: string; options: RadioOption[]; defaultValue?: string }) {
  return (
    <RadioGroup className="ra-radios" defaultValue={defaultValue}>
      <Label className="ra-label">{label}</Label>
      {options.map((o) => (
        <Radio key={o.id} value={o.id} className="ra-radio">
          <span className="ra-radio__dot" aria-hidden="true" />
          <span className="ra-radio__text"><span>{o.label}</span>{o.description && <Text slot="description" className="ra-radio__desc">{o.description}</Text>}</span>
        </Radio>
      ))}
    </RadioGroup>
  );
}

/* ---------- Number field ---------- */
export function AriaNumberField({ label, defaultValue = 2, min = 0, max = 10 }: { label: string; defaultValue?: number; min?: number; max?: number }) {
  return (
    <NumberField className="ra-field" defaultValue={defaultValue} minValue={min} maxValue={max}>
      <Label className="ra-label">{label}</Label>
      <div className="ra-stepper">
        <Button slot="decrement" className="ra-stepper__btn" aria-label="Decrease">&minus;</Button>
        <Input className="ra-stepper__input" />
        <Button slot="increment" className="ra-stepper__btn" aria-label="Increase">+</Button>
      </div>
    </NumberField>
  );
}

/* ---------- Menu ---------- */
export interface MenuEntry { id: string; label: string; shortcut?: string; danger?: boolean }
export function AriaMenu({ label, items, onAction }: { label: string; items: MenuEntry[]; onAction?: (id: Key) => void }) {
  const root = useRoot();
  return (
    <MenuTrigger>
      <Button className="ra-trigger ra-trigger--auto">{label}<Chevron /></Button>
      <Popover className="ra-popover" UNSTABLE_portalContainer={root}>
        <Menu className="ra-list" onAction={onAction}>
          {items.map((it) => (
            <MenuItem key={it.id} id={it.id} textValue={it.label} className={`ra-item${it.danger ? ' ra-item--danger' : ''}`}>
              <span>{it.label}</span>{it.shortcut && <kbd className="ra-kbd">{it.shortcut}</kbd>}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

/* ---------- Calendar ---------- */
export function AriaCalendar({ defaultValue = '2026-10-14' }: { defaultValue?: string }) {
  return (
    <Calendar className="ra-calendar" aria-label="Appointment date" defaultValue={parseDate(defaultValue)}>
      <header className="ra-calendar__head">
        <Button slot="previous" className="ra-calendar__nav" aria-label="Previous month">&lsaquo;</Button>
        <Heading className="ra-calendar__title" />
        <Button slot="next" className="ra-calendar__nav" aria-label="Next month">&rsaquo;</Button>
      </header>
      <CalendarGrid className="ra-calendar__grid">{(date) => <CalendarCell date={date} className="ra-cell" />}</CalendarGrid>
    </Calendar>
  );
}

/* ---------- Date field ---------- */
export function AriaDateField({ label, defaultValue = '2026-10-14' }: { label: string; defaultValue?: string }) {
  return (
    <DateField className="ra-field" defaultValue={parseDate(defaultValue)}>
      <Label className="ra-label">{label}</Label>
      <DateInput className="ra-date">{(segment) => <DateSegment segment={segment} className="ra-seg" />}</DateInput>
    </DateField>
  );
}

/* ---------- Tag group ---------- */
export function AriaTagGroup({ label, tags, removable = true }: { label: string; tags: Option[]; removable?: boolean }) {
  const [items, setItems] = useState(tags);
  return (
    <TagGroup className="ra-tags" selectionMode="multiple" onRemove={removable ? (keys) => setItems((cur) => cur.filter((t) => !keys.has(t.id))) : undefined}>
      <Label className="ra-label">{label}</Label>
      <TagList className="ra-taglist" items={items} renderEmptyState={() => <span className="ra-empty">No tags</span>}>
        {(t: Option) => (
          <Tag id={t.id} textValue={t.label} className="ra-tag">
            {({ allowsRemoving }) => (<>{t.label}{allowsRemoving && <Button slot="remove" className="ra-tag__x" aria-label={`Remove ${t.label}`}>&times;</Button>}</>)}
          </Tag>
        )}
      </TagList>
    </TagGroup>
  );
}

/* ---------- Search field ---------- */
export function AriaSearchField({ label = 'Search', placeholder = 'Search components' }: { label?: string; placeholder?: string }) {
  return (
    <SearchField className="ra-field ra-search">
      <Label className="ra-label ra-sr">{label}</Label>
      <div className="ra-input-wrap">
        <svg className="ra-search__icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></svg>
        <Input className="ra-input ra-search__input" placeholder={placeholder} />
        <Button className="ra-search__clear" aria-label="Clear">&times;</Button>
      </div>
    </SearchField>
  );
}

/* ---------- Breadcrumbs ---------- */
export function AriaBreadcrumbs({ items }: { items: { id: string; label: string; href: string }[] }) {
  return (
    <Breadcrumbs className="ra-crumbs">
      {items.map((it) => <Breadcrumb key={it.id} className="ra-crumb"><Link href={it.href} className="ra-crumb__link">{it.label}</Link></Breadcrumb>)}
    </Breadcrumbs>
  );
}

/* ---------- Toggle button group ---------- */
export function AriaToggleGroup({ label, options, defaultSelected = [], mode = 'single' }: { label: string; options: Option[]; defaultSelected?: string[]; mode?: 'single' | 'multiple' }) {
  return (
    <ToggleButtonGroup className="ra-toggles" aria-label={label} selectionMode={mode} defaultSelectedKeys={defaultSelected}>
      {options.map((o) => <ToggleButton key={o.id} id={o.id} className="ra-toggle">{o.label}</ToggleButton>)}
    </ToggleButtonGroup>
  );
}

/* ---------- Meter ---------- */
export function AriaMeter({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  return (
    <Meter className="ra-meter" value={value} maxValue={max}>
      {({ percentage, valueText }) => (<>
        <div className="ra-slider__head"><Label className="ra-label">{label}</Label><span className="ra-slider__out">{valueText}</span></div>
        <div className="ra-track"><div className="ra-track__bar" /><div className={`ra-track__fill${percentage > 90 ? ' is-danger' : percentage > 70 ? ' is-warn' : ''}`} style={{ width: `${percentage}%` }} /></div>
      </>)}
    </Meter>
  );
}

/* ---------- Modal dialog ---------- */
export function AriaModal({ trigger, title, description, confirmLabel = 'Confirm', danger = false }: { trigger: string; title: string; description: string; confirmLabel?: string; danger?: boolean }) {
  const root = useRoot();
  return (
    <DialogTrigger>
      <Button className="ra-open">{trigger}</Button>
      <ModalOverlay className="ra-overlay" isDismissable UNSTABLE_portalContainer={root}>
        <Modal className="ra-modal">
          <Dialog className="ra-dialog">
            {({ close }) => (<>
              <Heading slot="title" className="ra-dialog__title">{title}</Heading>
              <p className="ra-dialog__text">{description}</p>
              <div className="ra-dialog__actions">
                <Button className="ra-open ra-open--ghost" onPress={close}>Cancel</Button>
                <Button className={`ra-open${danger ? ' ra-open--danger' : ''}`} onPress={close} autoFocus>{confirmLabel}</Button>
              </div>
            </>)}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

/** Shows the dialog as it looks when open, plus a real trigger that opens the live modal. */
export function AriaModalDemo({ title, description, confirmLabel, danger = false }: { title: string; description: string; confirmLabel: string; danger?: boolean }) {
  return (
    <div className="ra-demo">
      <div className="ra-modal ra-modal--static" role="group" aria-label={`${title} (open state)`}>
        <div className="ra-dialog">
          <h3 className="ra-dialog__title">{title}</h3>
          <p className="ra-dialog__text">{description}</p>
          <div className="ra-dialog__actions">
            <span className="ra-open ra-open--ghost" aria-hidden="true">Cancel</span>
            <span className={`ra-open${danger ? ' ra-open--danger' : ''}`} aria-hidden="true">{confirmLabel}</span>
          </div>
        </div>
      </div>
      <AriaModal trigger="Open the live modal" title={title} description={description} confirmLabel={confirmLabel} danger={danger} />
    </div>
  );
}
