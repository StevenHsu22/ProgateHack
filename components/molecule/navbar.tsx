import React from 'react';

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar = (props: NavbarProps) => {
  return <nav className='navbar'>{props.children}</nav>;
};

export default Navbar;
