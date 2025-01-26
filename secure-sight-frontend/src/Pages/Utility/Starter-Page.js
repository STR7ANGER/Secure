import React from 'react';

import { Container } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


const StarterPage = () => {
    document.title = "Starter  | Upzet - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Utility" breadcrumbItem="Starter Page" />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default StarterPage;