import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { fetchForms, deleteOneForm } from '../../actions/formActions';
function FormRow(props) {
    const {form}= props;
    const editLink = `/forms/${form?._id}/edit`
    const schemaLink = `/forms/${form?._id}/edit`
    const collectLink = `/data-records/${form?._id}/new`
    return (
        <tr key={form?._id?.toString()}>
            <td><Link to={editLink}>{form?.name} <i className="icon-pencil"></i></Link></td>
            <td>{form?.version}</td>
            <td><Link to={schemaLink}>Edit Schema</Link></td>
            <td><Link to={collectLink}>Collect Data</Link></td>
        </tr>
    );
}
function Forms(props) {
    const { getForms } = props;
    useEffect(() => {
        getForms();
    }, [getForms]);
    return (
        <div className="animated fadeIn">
            <Row>
                <Col md={12}>
                    <Button tag={Link} to="/forms/new" color="primary" className="float-right mb-2">Create Form</Button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>

                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Forms
                        </CardHeader>
                        <CardBody>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th scope="col">name</th>
                                        <th scope="col">version</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.forms.map((form, index) =>
                                            <FormRow key={index} form={form} deleteForm={props.deleteForm} />
                                        )
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>

    )
}

const mapStateTopProps = (state) => {
    return {
        forms: state.form.forms,
        loading: state.form.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getForms: () => {
            dispatch(fetchForms());
        },

        deleteForm: (formId) => {
            dispatch(deleteOneForm(formId));
        },
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Forms);