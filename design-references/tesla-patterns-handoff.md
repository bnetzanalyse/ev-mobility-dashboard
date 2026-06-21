# Tesla Interaction Pattern Handoff

Source checked live on 2026-06-21 via visible browser automation:
- https://www.tesla.com/de_de/charging
- https://www.tesla.com/de_de/findus
- https://www.tesla.com/de_de/drive

Chrome extension control was unavailable in this fresh thread, but Computer Use worked through Microsoft Edge. No app code was edited.

## Patterns Worth Copying

### Global Navigation
- Use a thin, fixed top nav with very few center items and icon-only utility actions on the right.
- Mega menus should be full-width white sheets below the nav, not small floating popovers.
- Dim or blur the page underneath the menu to keep focus on navigation without adding heavy borders.
- Active/hover nav states are subtle: light grey pill background, no loud underline or color.
- Menu content is structured as large visual/action tiles on the left plus a narrow secondary link list divided by one vertical rule.

Implementation translation:
- `header` fixed/top sticky, `h-14` or `h-16`, white background, minimal shadow.
- shadcn `NavigationMenu` or custom Radix popover sheet; use `backdrop-blur-sm` / semi-transparent overlay behind the open sheet.
- Dashboard equivalent: top modules such as Overview, Charging, Operators, Regions, Data Quality; mega menu tiles can expose common deep links.

### Charging Page Layout
- Full-bleed media hero with centered title and one primary action, not a card grid.
- Long content sections use generous whitespace and concise headings.
- CTA placement is restrained; one action is enough when the screen is mostly visual or explanatory.

Implementation translation:
- For the EV dashboard, avoid fake marketing heroes. Use this discipline for an overview header only: sparse title, one key action, real data context.
- Do not copy Tesla imagery/branding. Copy the spacing, restraint, and hierarchy.

### Find-Us Map
- The map is the product: it fills almost the entire viewport below the nav.
- Search and filter controls float at top-left in compact white surfaces.
- Filter opens as a left drawer, full height below nav, with group headings, separators, square checkboxes, and muted disabled options.
- Selected filters are quiet: checkmarks and dependent sub-options, not colorful chips everywhere.
- Map markers are small and dense by default; selected marker becomes larger and adds a subtle influence/selection area.
- Location search expands into an inline suggestion list under the input, with simple row icons and dividers.
- Detail state opens as a left-side card/panel over the map. It has a close button, title/subtitle/address, grey info callout, icon-only amenities, metrics, fee rows, and internal scroll.

Implementation translation:
- For MapLibre later: make the map the canvas, not a small widget inside a dashboard card.
- Use `Sheet`/`Drawer` for filters, `Command` or combobox for location search, `Checkbox` for filters, lucide icons for amenities and actions.
- Detail panel can be a shadcn `Sheet`-like fixed panel with `w-[380px]`, `top-nav-offset`, `overflow-y-auto`, and grouped `Separator`s.
- Keep filter state mirrored in the URL/query params if possible, like Tesla does with bounds and filters.

### Drive Form / Flow
- Step sections are large and separated by whitespace rather than wizard chrome.
- Selection rows are rectangular, low-radius, border-based controls with clear selected state.
- Two-column operational layout works well: options/list on the left, map or preview on the right.
- Long flows use a sticky bottom summary bar with the selected entity/time/location and one primary confirmation button.
- Form fields are quiet grey inputs; labels sit above fields; phone input uses a compact country-code selector.
- Supporting explainer panels are grey bands with one secondary action.

Implementation translation:
- Use `RadioGroup` with custom row cards for operator/region/scenario selection.
- Use `Input`, `Select`, `Calendar`, `Checkbox`, and `Button`; keep fields full-width and calm.
- Add a sticky bottom comparison/action bar for long dashboard flows, e.g. "3 filters active - Germany - 2026 snapshot" plus "Apply" or "Export".

## What To Avoid

- Do not copy Tesla branding, logo spacing, vehicle/product imagery, or product wording.
- Do not recreate the old MUI/blue dashboard look; no saturated blue panels, generic KPI-card soup, or crowded sidebar chrome.
- Avoid putting the map inside a decorative card. The map should be a working surface.
- Avoid too many colored chips. Use filters sparingly and let the drawer carry detail.
- Avoid nested cards. Tesla uses panels, rows, drawers, separators, and whitespace more than card stacks.
- Avoid verbose instructional copy inside the app. Let controls and labels do the work.

## Concrete Component Targets

- `AppShell`: fixed top nav, neutral, sparse, icon utilities.
- `ModuleMegaMenu`: full-width sheet with domain tiles and secondary links.
- `MapWorkspace`: `nav height + map canvas + floating controls`.
- `FilterDrawer`: left drawer with grouped checkboxes and sticky clear/apply area.
- `LocationSearch`: combobox with suggestion rows.
- `MapDetailPanel`: left overlay panel for selected charger/operator/region.
- `SelectionRow`: low-radius selectable row for models/operators/regions/scenarios.
- `StickyActionBar`: bottom summary + primary action for long flows.

