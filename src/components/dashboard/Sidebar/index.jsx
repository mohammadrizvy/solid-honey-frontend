import React from "react";
import { Link } from "react-router-dom";
import { sidebar } from "./data";
import { useLocation } from 'react-router-dom';


export const SidebarItem = ({ item }) => {
  const location = useLocation();

  // console.log("pathname",location?.pathname);

  if (item?.children) {
    ("nav-link", item?.nav_Link);

    return (
      <div className="mt-2">
        <div className="text-gray-400">{item.nav_name}</div>
        <div>
          {item.children.map((childItem, index) => (
            <SidebarItem key={index} item={childItem} />
          ))}
        </div>
      </div>
    );
  }
  else {
    ("nav-link", item?.nav_Link);

    return (
      <Link
        to={item.nav_Link}
        className={`hover:bg-honey ${location?.pathname.toLowerCase() === item?.nav_Link.toLowerCase ? "bg-honey text-muted" : "text-honey "}flex items-center gap-3 rounded-lg px-3 py-2 text-honey transition-all hover:text-muted`}
      >
        {item.icon && <item.icon />}
        {item.nav_name}
      </Link>
    );
  }
};

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-gray-800 md:block animate__animated animate__backInLeft">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-honey">সলিড</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sidebar.map((sidebarNavigation, index) => (
              <SidebarItem key={index} item={sidebarNavigation} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;






// import React from "react";
// import { Link } from "react-router-dom";
// import { sidebar } from "./data";
// import { useLocation } from 'react-router-dom';


// export const SidebarItem = ({ item }) => {
//   const location = useLocation();

//   // console.log("pathname",location?.pathname);

//   if (item?.children) {
//     console.log("nav-link", item?.nav_Link);

//     return (
//       <div className="mt-2">
//         <div className="text-gray-400">{item.nav_name}</div>
//         <div>
//           {item.children.map((childItem, index) => (
//             <SidebarItem key={index} item={childItem} />
//           ))}
//         </div>
//       </div>
//     );
//   }
//   else {
//     console.log("nav-link", item?.nav_Link);

//     return (
//       <Link
//         to={item.nav_Link}
//         className={`hover:bg-honey ${location?.pathname.toLowerCase() === item?.nav_Link.toLowerCase ? "bg-honey text-muted" : "text-honey "}flex items-center gap-3 rounded-lg px-3 py-2 text-honey transition-all hover:text-muted`}
//       >
//         {item.icon && <item.icon />}
//         {item.nav_name}
//       </Link>
//     );
//   }
// };

// const Sidebar = () => {
//   return (
//     <div className="hidden border-r bg-gray-800 md:block animate__animated animate__backInLeft">
//       <div className="flex h-full max-h-screen flex-col gap-2">
//         <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
//           <Link to="/" className="flex items-center gap-2 font-semibold">
//             <span className="text-honey">সলিড</span>
//           </Link>
//         </div>
//         <div className="flex-1">
//           <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//             {sidebar.map((sidebarNavigation, index) => (
//               <SidebarItem key={index} item={sidebarNavigation} />
//             ))}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

