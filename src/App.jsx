import React from "react";
import {
  Grid,
  Navbar,
  Panel,
  Row,
  Col,
  Tab,
  FormControl,
  NavItem,
  Nav,
  Form,
  FormGroup,
  ControlLabel,
  Button
} from "react-bootstrap";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import {
  getSource,
  getTypecheckResult,
  getRunResult,
  edit,
  getShareURL,
  getParameter,
  getStorage,
  run,
  setInputField,
  selectTab
} from "./editing";
import "brace/theme/tomorrow_night_bright";

require("./mode-michelson.js");

const Share = ({ shareURL }) => {
  return (
    <div style={{ paddingLeft: 30, paddingTop: 10 }}>
      <a href={shareURL}>Sharing Link</a>
    </div>
  );
};

const RunUnconnected = ({
  run,
  runResult,
  setInputField,
  parameter,
  storage
}) => {
  return (
    <Form
      horizontal
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        run();
      }}
    >
      <FormGroup controlId="storage">
        <Col componentClass={ControlLabel} value={storage} sm={2}>
          Storage
        </Col>
        <Col sm={10}>
          <FormControl
            type="text"
            value={storage}
            placeholder="E.g., Unit, 15, &quot;test&quot;, (Pair &quot;foo&quot; &quot;bar&quot;)"
            onChange={val => setInputField("storage", val.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup controlId="parameter">
        <Col componentClass={ControlLabel} sm={2}>
          Parameter
        </Col>
        <Col sm={10}>
          <FormControl
            type="text"
            value={parameter}
            placeholder="E.g., Unit, 15, &quot;test&quot;, (Pair &quot;foo&quot; &quot;bar&quot;)"
            onChange={val => setInputField("parameter", val.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col smOffset={2} sm={10}>
          {runResult ? (
            <div>
              <pre>{runResult}</pre>
              <Button type="submit">Run</Button>
            </div>
          ) : (
            <Button type="submit">Run</Button>
          )}
        </Col>
      </FormGroup>
    </Form>
  );
};

const Run = connect(
  state => ({
    runResult: getRunResult(state),
    parameter: getParameter(state),
    storage: getStorage(state)
  }),
  { run, setInputField }
)(RunUnconnected);

const TabsUnconnected = ({
  selectTab,
  selectedTab,
  source,
  shareURL,
  result
}) => {
  return (
    <Panel>
      <Tab.Container id="result" defaultActiveKey={1} onSelect={selectTab}>
        <div>
          <div className="panel-heading clearfix">
            <Nav bsStyle="tabs">
              <NavItem eventKey={1}>Run</NavItem>
              <NavItem eventKey={2}>Typecheck</NavItem>
              <NavItem eventKey={3}>Share</NavItem>
            </Nav>
          </div>
          <Tab.Content animation={false}>
            <Tab.Pane eventKey={1} title="Run">
              <Run />
            </Tab.Pane>
            <Tab.Pane eventKey={2} title="Typecheck">
              <div style={{ paddingLeft: 30 }}>
                <pre>{result}</pre>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey={3} title="Share">
              <Share shareURL={shareURL} />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
      <br />
    </Panel>
  );
  /*return 
    <ButtonToolbar>
      <Button bsStyle="primary" onClick={typecheck} disabled={source === ""}>Typecheck</Button>
      <Button bsStyle="info" onClick={share} disabled={source === ""}>Share</Button>
    </ButtonToolbar>
    </div>*/
};

const Results = connect(
  state => ({
    source: getSource(state),
    result: getTypecheckResult(state),
    shareURL: getShareURL(state)
  }),
  { selectTab }
)(TabsUnconnected);

const RenderPage = ({ source, edit, result, select }) => {
  return (
    <div>
      <Navbar inverse staticTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Try Michelson</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
      <Grid>
        <Row>
          <Col xs={12} md={5} className="col-md-push-7">
            <Panel header="Getting Started">
              <div style={{ height: "330px" }}>
                <p>
                  <b>Note:</b> I'm happy to now be able to recommend
                  <a href="http://www.liquidity-lang.org/edit/">
                    Try-Liquidity
                  </a>, which not only has all the same features for trying
                  Michelson, but also provides a compiler and decompiler for
                  Liquidity, a higher-level language similar to OCaml. As a
                  result, Try Michelson should be considered <b>deprecated</b>{" "}
                  and will not be updated to support newer versions of
                  Michelson.
                </p>
                <p>
                  You can learn more about Michelson from the{" "}
                  <a href="https://github.com/tezos/tezos/blob/master/docs/michelson.md">
                    docs
                  </a>.
                </p>
                <p>
                  This demo is provided for convenience only. Do not rely on it
                  for anything serious.
                </p>
                <p>
                  This project has no affiliation with the Tezos Foundation.
                </p>
              </div>
            </Panel>
          </Col>
          <Col xs={12} md={7} className="col-md-pull-5">
            <Panel header="Source">
              <AceEditor
                mode="michelson"
                theme="tomorrow_night_bright"
                name="codeEditor"
                width="100%"
                height="330px"
                value={source}
                onChange={edit}
                editorProps={{ $blockScrolling: true }}
                setOptions={{ useSoftTabs: true, wrap: true }}
              />
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Results />
          </Col>
        </Row>
      </Grid>
      <footer className="page-footer">
        <div className="container">
          created by <a href="https://twitter.com/danrobinson">@danrobinson</a>
        </div>
      </footer>
    </div>
  );
};

const App = connect(
  state => ({
    source: getSource(state),
    result: getTypecheckResult(state)
  }),
  { edit }
)(RenderPage);

export default App;
