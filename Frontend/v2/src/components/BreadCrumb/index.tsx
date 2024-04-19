/** @format */

import withBreadcrumbs from "react-router-breadcrumbs-hoc";

const Breadcrumb = ({ breadcrumbs }) => <>{breadcrumbs.map(({ breadcrumb }) => breadcrumb)}</>;

export default withBreadcrumbs()(Breadcrumb);
