import {AsideHeader, MakeItemParams, MenuItemType} from '@gravity-ui/navigation';
import {Gear, Ghost} from '@gravity-ui/icons';

import {InfoButtons} from './components/InfoButtons';
import {Wrapper} from './components/Wrapper';
import { IconProps, QAProps, Theme, ThemeProvider } from '@gravity-ui/uikit';
import React from 'react';

interface MenuItem extends QAProps {
    id: string;
    title: React.ReactNode;
    tooltipText?: React.ReactNode;
    icon?: IconProps['data'];
    iconSize?: number | string;
    iconQa?: string;
    link?: string;
    current?: boolean;
    pinned?: boolean;
    onItemClick?: (
        item: MenuItem,
        collapsed: boolean,
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => void;
    onItemClickCapture?: (event: React.SyntheticEvent) => void;
    onCollapseItemClick?: () => void;
    itemWrapper?: (
        p: MakeItemParams,
        makeItem: (p: MakeItemParams) => React.ReactNode,
        opts: {
            collapsed: boolean;
            compact: boolean;
            item: MenuItem;
            ref: React.RefObject<HTMLElement>;
        },
    ) => React.ReactNode;
    preventUserRemoving?: boolean;
    rightAdornment?: React.ReactNode;
    type?: MenuItemType;
    afterMoreButton?: boolean;
    /**
     * Order number. Used to determine the display order in the side menu
     */
    order?: number;
    /**
     * Visibility flag in the side menu
     */
    hidden?: boolean;
    /**
     * The category to which the menu item belongs. Need for grouping in the display/editing mode of all pages
     */
    category?: string;
}

const DARK = 'dark';
const DEFAULT_THEME = DARK;

const menuItemsShowcase: MenuItem[] = [
    {
        id: 'overview',
        title: 'Overview',
        icon: Gear,
        qa: 'menu-item-gear',
        iconQa: 'menu-item-icon-gear',
    }
];

const App = () => {

    const [theme] = React.useState<Theme>(DEFAULT_THEME);

    const [menuItems, setMenuItems] = React.useState<MenuItem[]>([
        ...menuItemsShowcase,
    ]);
     
    return (
        <ThemeProvider theme={theme}>
            <AsideHeader
                logo={{icon: Ghost, text: 'vite-example'}}
                compact={true}
                hideCollapseButton={true}
                renderContent={() => (
                    <Wrapper>
                        <InfoButtons />
                    </Wrapper>
                )}
                onMenuItemsChanged={setMenuItems}
                menuItems={menuItems}
            />
        </ThemeProvider>
    );
};

export default App;
