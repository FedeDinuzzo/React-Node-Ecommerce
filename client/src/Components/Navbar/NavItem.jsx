import React from "react";
import { Link } from 'react-router-dom';

export default function NavItem({ content, to }) {
    return (
        <div className="text-lg cursor-pointer">
            <Link to={`${to}`}>{content}</Link>
        </div>
    );
}

