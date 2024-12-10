import React from 'react';
import block from 'bem-cn-lite';
import { Button, Icon, IconProps, QAProps, Theme, ThemeProvider } from '@gravity-ui/uikit';
import { Gear, Ghost, Moon, Sun } from '@gravity-ui/icons';

import './Wrapper.scss';
import { AsideHeader, MakeItemParams, MenuItemType } from '@gravity-ui/navigation';

const b = block('wrapper');

const DARK = 'dark';
const LIGHT = 'light';
const DEFAULT_THEME = DARK;

export const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export type AppProps = {
    children: React.ReactNode;
};

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

const menuItemsShowcase: MenuItem[] = [
    {
        id: 'overview',
        title: 'Overview',
        icon: Gear,
        qa: 'menu-item-gear',
        iconQa: 'menu-item-icon-gear',
    }
];

export const Wrapper: React.FC<AppProps> = ({ children }) => {
    const [theme, setTheme] = React.useState<Theme>(DEFAULT_THEME);
    const isDark = theme === DARK;

    const [menuItems, setMenuItems] = React.useState<MenuItem[]>([
        ...menuItemsShowcase,
    ]);

    return (

        <ThemeProvider theme={theme}>
            <AsideHeader
                logo={{ icon: Ghost, text: 'vite-example' }}
                compact={true}
                hideCollapseButton={true}
                renderContent={() => (
                <div className={b()}>
                    <div className={b('theme-button')}>
                        <Button
                            size="l"
                            view="outlined"
                            onClick={() => {
                                setTheme(isDark ? LIGHT : DARK);
                            }}
                        >
                            <Icon data={isDark ? Sun : Moon} />
                        </Button>
                    </div>
                    <div className={b('layout')}>
                        <div className={b('header')}>
                            <div className={b('logo')}>
                                <div className={b('gravity-logo', { dark: isDark })} />
                                <div className={b('vite-logo')} />
                            </div>
                        </div>
                        <div className={b('content')}>{children}</div>
                    </div>
                </div>
                )}
                onMenuItemsChanged={setMenuItems}
                menuItems={menuItems}
            />
        </ThemeProvider>
    );
};