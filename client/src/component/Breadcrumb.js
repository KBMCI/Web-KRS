import { NavLink, useLocation } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  const location = useLocation();
  // Components skill
  const activeLink = "text-primary font-bold capitalize";
  const normalLink = "font-semibold";

  // Mengambil location link active
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .filter((crumb) => crumb !== items.name)
    .map((crumb) => {
      return (
        <div key={crumb} className="flex gap-[10px]">
          <p>/</p>
          <NavLink
            to={crumb}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {crumb}
          </NavLink>
        </div>
      );
    });
  return (
    <div>
      <div className="flex gap-[10px] text-neutral-400">
        <NavLink
          to={items.link}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Dashboard
        </NavLink>

        {crumbs}
      </div>
    </div>
  );
};

export default Breadcrumb;
