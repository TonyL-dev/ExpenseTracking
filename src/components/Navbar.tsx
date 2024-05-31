import { Colors } from '../ColorScheme';
import { Link, Outlet } from 'react-router-dom';

// Navigation bar at the top
function Navbar() {

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home', to: '/' },
    { id: 2, text: 'Income', to: '/income' },
    { id: 3, text: 'Expenses', to: '/expenses'}
  ]

  return (
    <>
        <div className='bg-black flex justify-between items-center h-24 mx-auto px-12 text-white'>
            <Link to={"/"}>
                <h1 className={`w-full text-3xl font-bold text-[${Colors.Yellow}]`}>Expense Tracker App</h1>
            </Link>
            {/* Desktop Navigation */}
            <nav>
                <ul className='flex'>
                    {navItems.map(item => (
                        <Link to={item.to}>
                        <li
                            key={item.id}
                            className={`p-4 hover:bg-[${Colors.Yellow}] rounded-xl m-2 text-[${Colors.Yellow}] cursor-pointer duration-300 hover:text-black`}
                        >
                            {item.text}
                        </li>
                        </Link>
                    ))}
                </ul>
            </nav>

        </div>
        <Outlet />
      </>
  );
};

export default Navbar;

