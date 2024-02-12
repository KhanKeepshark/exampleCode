import type { FC } from "react";
import { Link } from "react-router-dom";
import type { NavLinkProps } from "../models/props";

export const NavLink: FC<NavLinkProps> = ({ to, text }) => {
  return (
    <Link
      className="font-bold text-brand-primary hover:brightness-150 active:brightness-75"
      to={to}
    >
      {text}
    </Link>
  );
};
