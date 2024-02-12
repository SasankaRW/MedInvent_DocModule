import React, { Fragment, useEffect } from 'react'
import Scrollbar from 'react-perfect-scrollbar'
import { navigations } from 'app/navigations'
import { getNavigationByUser } from 'app/redux/actions/NavigationAction'
import { MatxVerticalNav } from 'app/components'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from 'app/hooks/useAuth'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    scrollable: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    sidenavMobileOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100vw',
        //background: 'rgba(0, 0, 0, 0.54)', //Commit by Roshan
        zIndex: -1,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}))




const Sidenav = ({ children }) => {
    const classes = useStyles()
    const { settings, updateSettings } = useSettings()

    //Developed by roshan -- start
    const {
        isAuthenticated,
        user
    } = useAuth()


    let nav = [];

    const getfilteredNavigations = (navList = [], roles) => {
        return navList.reduce((array, nav) => {
            if (nav.auth) {
                /*  if (nav.auth.includes(roles)) {
                     array.push(nav)
                 } */

                roles.forEach(menurole => {
                    if (nav.auth.includes(menurole)) {
                        array.push(nav)
                    }
                });




            } else {
                if (nav.children) {
                    nav.children = getfilteredNavigations(nav.children, roles)
                    array.push(nav)
                } else {
                    array.push(nav)
                }
            }
            return array
        }, [])
    }


    const createUsersideBar = () => {
        let filteredNavigations = getfilteredNavigations(navigations, user.roles)
        nav = filteredNavigations;
        console.log("sasas", filteredNavigations)
    }

    createUsersideBar();
    //Developed by roshan --end

    const updateSidebarMode = (sidebarSettings) => {
        let activeLayoutSettingsName = settings.activeLayout + 'Settings'
        let activeLayoutSettings = settings[activeLayoutSettingsName]

        updateSettings({
            ...settings,
            [activeLayoutSettingsName]: {
                ...activeLayoutSettings,
                leftSidebar: {
                    ...activeLayoutSettings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        })
    }

    return (
        <Fragment>
            <Scrollbar
                options={{ suppressScrollX: true }}
                className={clsx('relative px-4', classes.scrollable)}
            >
                {children}
                <MatxVerticalNav items={nav} />
            </Scrollbar>

            <div
                onClick={() => updateSidebarMode({ mode: 'close' })}
                className={classes.sidenavMobileOverlay}
            />
        </Fragment>
    )
}

export default Sidenav
