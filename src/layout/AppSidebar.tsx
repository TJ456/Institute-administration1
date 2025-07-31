import { useCallback } from "react";
import { Link, useLocation } from "react-router";

// Only import icons needed for LMS - Dashboard, Teacher, Department, and Student
import {
  GridIcon,
  HorizontaLDots,
  AngleDownIcon,
  BoxIcon,
  UserIcon,
  GroupIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: NavItem[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <UserIcon />,
    name: "Teacher",
    path: "/teacher",
  },
  {
    icon: <BoxIcon />,
    name: "Department",
    submenu: [
      {
        icon: <GridIcon />,
        name: "IT",
        path: "/department/it",
      },
      {
        icon: <GridIcon />,
        name: "ECE",
        path: "/department/ece",
      },
      {
        icon: <GridIcon />,
        name: "EEE",
        path: "/department/eee",
      },
      {
        icon: <GridIcon />,
        name: "CIVIL",
        path: "/department/civil",
      },
      {
        icon: <GridIcon />,
        name: "MECHANICAL",
        path: "/department/mechanical",
      },
    ],
  },
  {
    icon: <GroupIcon />,
    name: "Student",
    path: "/student",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, openSubmenu, toggleSubmenu } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          {nav.submenu ? (
            // Menu item with submenu
            <div>
              <button
                onClick={() => toggleSubmenu(nav.name)}
                className={`menu-item group w-full text-left ${
                  openSubmenu === nav.name ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    openSubmenu === nav.name
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <>
                    <span className="menu-item-text flex-1">{nav.name}</span>
                    <AngleDownIcon 
                      className={`size-4 transition-transform duration-200 ${
                        openSubmenu === nav.name ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </button>
              {/* Submenu */}
              {openSubmenu === nav.name && (isExpanded || isHovered || isMobileOpen) && (
                <ul className="mt-2 ml-6 space-y-2">
                  {nav.submenu.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path!}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path!) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"
                        }`}
                      >
                        <span className="menu-item-text">{subItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            // Regular menu item
            <Link
              to={nav.path!}
              className={`menu-item group ${
                isActive(nav.path!) ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isActive(nav.path!)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/infuni1.png"
                alt="InfuniLMS Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/infuni1.png"
                alt="InfuniLMS Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/infuni1.png"
              alt="InfuniLMS Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
