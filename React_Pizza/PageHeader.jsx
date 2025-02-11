import { Link } from 'react-router-dom';

function PageHeader() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#343a40' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">🍕 Pizza Management System</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Pizza/list">🍕 Pizza</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Pizza/create">Add Pizza</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default PageHeader;
