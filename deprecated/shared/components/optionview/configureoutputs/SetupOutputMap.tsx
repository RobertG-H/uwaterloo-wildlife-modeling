import React, { ChangeEvent } from 'react';
import { Step, Button, Menu, Input, Header, Checkbox, Image, Segment, Modal } from 'semantic-ui-react';
import { OutputContext, OutputMap } from '../../../../../OutputProvider';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import HabitatQualityRow from './HabitatQualityRow';
import regionImage from '../../../../cycle3-selected-region.png';
// import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { v4 as uuidv4 } from 'uuid';

const SetupOutputMap = (props: any) => {
  const { outputMapDict, SetOutputMapDict } = React.useContext(OutputContext);

  const [currentStep, setCurrentStep] = React.useState(0);
  const [loadedSketch, SetLoadedSketch] = React.useState(false);
  const [arcSketch, setArcSketch] = React.useState<Sketch | null>(null);
  const arcSketchRef = React.useRef<Sketch | null>(null);
  arcSketchRef.current = arcSketch;

  const [disableGenerateMap, setDisableGenerateMap] = React.useState(true);
  const [speciesName, setSpeciesName] = React.useState('');
  const [outputExtent, setOutputExtent] = React.useState([0, 0, 0, 0]);

  const [regionSelected, setRegionSelected] = React.useState(false);
  const regionSelectedRef = React.useRef<boolean | null>(null);
  regionSelectedRef.current = regionSelected;

  // const [regionPreSelect, setRegionPreSelect] = React.useState<FeatureLayer | null>(null);
  // const regionPreSelectRef = React.useRef<FeatureLayer | null>(null);
  // regionPreSelectRef.current = regionPreSelect;

  // const [regionPostSelect, setRegionPostSelect] = React.useState<FeatureLayer | null>(null);
  // const regionPostSelectRef = React.useRef<FeatureLayer | null>(null);
  // regionPostSelectRef.current = regionPostSelect;

  const [outputName, setOutputName] = React.useState('');
  const [saveAsId, setSaveAsId] = React.useState('');

  const [modalOpen, setModalOpen] = React.useState(false);
  const finalStepIndex = 3;
  const graphicsLayer = new GraphicsLayer({});
  const sketchViewRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (sketchViewRef.current && !loadedSketch) {
      SetLoadedSketch(true);
      const sketch = new Sketch({
        layer: graphicsLayer,
        view: props.arcView,
        container: sketchViewRef.current,
        visibleElements: {
          undoRedoMenu: false,
          createTools: {
            point: false,
            polyline: false,
            polygon: false,
            rectangle: true,
            circle: false,
          },
          selectionTools: {
            'rectangle-selection': false,
            'lasso-selection': false,
          },
        },
      });

      setArcSketch(sketch);

      sketch.on('create', function (event) {
        if (event.state === 'complete' && !regionSelectedRef.current && event.graphic) {
          onSelectRegionCreate();
        }
      });
    }
  });

  // Cleanup: https://stackoverflow.com/questions/55139386/componentwillunmount-with-react-useeffect-hook
  const val = React.useRef();
  React.useEffect(() => {
    val.current = props;
  }, [props]);
  React.useEffect(() => {
    return () => {
      console.log('cleanup');
      if (arcSketchRef.current) {
        arcSketchRef.current.cancel();
      }
      tryToRemovePostSelect();
      tryToRemovePreSelect();
    };
  }, []);
  //arcSketch, regionSelected, regionPostSelect
  React.useEffect(() => {
    setSpeciesName(outputMapDict![props.editingMapId].speciesName);
    setOutputName(outputMapDict![props.editingMapId].outputName);
    setOutputExtent(outputMapDict![props.editingMapId].extent);
    checkDisableGenerateMapButton(outputMapDict![props.editingMapId].outputName);
    if (outputMapDict![props.editingMapId].extent[0] !== 0) {
      onSelectRegionCreate();
    }
  }, []);
  const onCancel = () => {
    if (arcSketchRef.current) {
      arcSketchRef.current.cancel();
    }
    props.setIsEditingOutput(false);
    props.setIsEditingExistingOutput(false);
  };

  const onBack = () => {
    if (arcSketchRef.current) {
      arcSketchRef.current.cancel();
    }
    if (currentStep === 0) return;
    tryToRemovePreSelect();
    setCurrentStep(currentStep - 1);
    SetLoadedSketch(false);
  };

  const onNext = () => {
    if (arcSketchRef.current) {
      arcSketchRef.current.cancel();
    }
    if (currentStep === finalStepIndex) return;
    if (currentStep === 0 && !regionSelected) {
      //Add the highlight region feature layer

      // const featureLayer = new FeatureLayer({
      //   url: 'https://services1.arcgis.com/DwLTn0u9VBSZvUPe/arcgis/rest/services/Region_PreSelect/FeatureServer',
      // });
      // props.arcMap.add(featureLayer);
      // setRegionPreSelect(featureLayer);

      console.log('Select a region!');
    } else {
      tryToRemovePreSelect();
    }
    setCurrentStep(currentStep + 1);
    SetLoadedSketch(false);
  };

  const isStepCompleted = (step: number) => {
    return step < currentStep;
  };

  const isStepActive = (step: number) => {
    return step === currentStep;
  };

  const isStepDisabled = (step: number) => {
    return step > currentStep;
  };

  const onSpeciesInputChange = (event: ChangeEvent, data: any) => {
    setSpeciesName(data.value);
  };

  const tryToRemovePreSelect = () => {
    // if (regionPreSelectRef.current) {
    //   props.arcMap.remove(regionPreSelectRef.current);
    //   setRegionPreSelect(null);
    // }
  };

  const tryToRemovePostSelect = () => {
    // if (regionPostSelectRef.current) {
    //   props.arcMap.remove(regionPostSelectRef.current);
    //   setRegionPostSelect(null);
    // }
  };

  const onSelectRegionCreate = () => {
    tryToRemovePreSelect();
    if (arcSketchRef.current) {
      arcSketchRef.current.cancel();
    }
    if (regionSelected) return;

    // if (regionPostSelect) return;
    // const newFeatureLayer = new FeatureLayer({
    //   url: 'https://services1.arcgis.com/DwLTn0u9VBSZvUPe/arcgis/rest/services/Region_Selected/FeatureServer',
    // });
    // props.arcMap.add(newFeatureLayer);
    // setRegionPostSelect(newFeatureLayer);

    setRegionSelected(true);
    const newExtent = [11895207.411419, 1282809.161558, 1338609.161558, 11858247.411419];
    outputMapDict![props.editingMapId].extent = newExtent;
    setOutputExtent(newExtent);
  };

  const onExtentInputChange = (event: ChangeEvent, data: any) => {
    // deepcopy array
    const newExtent = outputExtent.slice();
    newExtent[data.index] = parseInt(data.value);
    console.log(newExtent);
    setOutputExtent(newExtent);
    if (Object.keys(outputMapDict!).length > 0) {
      outputMapDict![props.editingMapId].extent[data.index] = parseInt(data.value);
    }
  };

  const onOutputNameChange = (event: ChangeEvent, data: any) => {
    setOutputName(data.value);
    checkDisableGenerateMapButton(data.value);
  };

  const onCheckboxHotspot = (event: any, data: any) => {
    if (Object.keys(outputMapDict!).length > 0) {
      outputMapDict![props.editingMapId].outputTypes['hotspots'] = data.checked;
    }
  };

  const onCheckboxConnectivity = (event: any, data: any) => {
    if (Object.keys(outputMapDict!).length > 0) {
      outputMapDict![props.editingMapId].outputTypes['connectivity'] = data.checked;
    }
  };

  const onGenerateNewMap = () => {
    generateMap(props.editingMapId, outputName);
  };

  const onGenerateEditMapModal = () => {
    setModalOpen(true);
  };

  const onGenerateEditMap = (overwrite = false) => {
    if (overwrite) {
      generateMap(props.editingMapId, outputName);
    } else {
      const newOutput: { [outputMapId: string]: OutputMap } = {};
      const newId = uuidv4();

      newOutput[newId] = JSON.parse(JSON.stringify(outputMapDict![props.editingMapId]));
      newOutput[newId].speciesName = speciesName;
      newOutput[newId].outputName = outputName;
      setSaveAsId(newId);
      SetOutputMapDict({
        ...outputMapDict,
        ...newOutput,
      });
      tryToRemovePreSelect();
      tryToRemovePostSelect();
    }
  };

  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (didMountRef.current) {
      props.onSetupOutputComplete(saveAsId, outputName);
    } else {
      didMountRef.current = true;
    }
  }, [outputMapDict]);

  const generateMap = (mapId: string, newOutputName: string) => {
    outputMapDict![props.editingMapId].speciesName = speciesName;
    outputMapDict![props.editingMapId].outputName = outputName;

    props.onSetupOutputComplete(mapId, newOutputName);
    tryToRemovePreSelect();
    tryToRemovePostSelect();
  };

  const setHabitatQualityValue = (landCover: string, newValue: number) => {
    outputMapDict![props.editingMapId].habitatQualityValues[landCover] = newValue;
  };

  const checkDisableGenerateMapButton = (name: string) => {
    if (name.length === 0) setDisableGenerateMap(true);
    if (name.charAt(0) === '1' || name.charAt(0) === '2') setDisableGenerateMap(false);
    else setDisableGenerateMap(true);
  };

  const generateHabitatQualityRows = () => {
    const rows = [];
    for (const landCover in outputMapDict![props.editingMapId].habitatQualityValues) {
      rows.push(
        <HabitatQualityRow setHabitatQualityValue={setHabitatQualityValue} landCover={landCover} editingMapId={props.editingMapId} />,
      );
    }
    return rows;
  };

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', paddingLeft: 20, paddingRight: 20 }}>
      <style>
        {`
          .ui.ordered.steps .step:before{
            font-size: 2em !important;
          }
          .esri-icon-cursor {
            display: none;
          }
          .esri-sketch__section:second-child{
            padding: 0;
            margin: 0;
          }
          .esri-sketch__button{
            padding: 20px 40px !important;
          }
          .esri-sketch__section{
            padding: 0;
          }
          .esri-sketch__tool-section{
            border-width: 0;
          }`}
      </style>
      <Step.Group ordered size='mini'>
        <Step active={isStepActive(0)} disabled={isStepDisabled(0)}>
          <Step.Content>
            <Step.Title>Species</Step.Title>
          </Step.Content>
        </Step>

        <Step active={isStepActive(1)} disabled={isStepDisabled(1)}>
          <Step.Content>
            <Step.Title>Location</Step.Title>
          </Step.Content>
        </Step>

        <Step active={isStepActive(2)} disabled={isStepDisabled(2)}>
          <Step.Content>
            <Step.Title>Land Cover</Step.Title>
          </Step.Content>
        </Step>

        <Step active={isStepActive(finalStepIndex)} disabled={isStepDisabled(finalStepIndex)}>
          <Step.Content>
            <Step.Title>Finalize</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>

      {/* Step 1 - Species  */}
      {currentStep === 0 && (
        <div style={{ textAlign: 'left' }}>
          <div>
            <Header style={{ display: 'inline-block', marginRight: 10, marginBottom: 10 }} as='h3'>
              Identify the Focal Species
            </Header>
            {/* <Popup trigger={<Icon name='info' size='small' circular />} content={speciesToolTip} position='right center'></Popup> */}
          </div>
          <div className='wordwrap' style={{ marginBottom: 14 }}>
            Please enter the species name or species group you wish to analyze.
          </div>
          <Input
            value={speciesName}
            fluid
            size={'large'}
            placeholder='Enter a species or group (ex. Frogs)'
            onChange={onSpeciesInputChange}
          />
        </div>
      )}
      {/* END Step 1 - Species  */}

      {/* Step 2 - Location */}
      {currentStep === 1 && (
        <div style={{ textAlign: 'left' }}>
          <Header as='h3'>Identify the Study Region</Header>
          <div className='wordwrap' style={{ marginBottom: 14 }}>
            Please identify the study region you wish to analyze by selecting an area on the
            <div>map using the box tool below or by inputting the geographic boundaries of the </div>
            <div>extent in easting & northing.</div>
          </div>
          <div style={{ overflowY: 'scroll', maxHeight: '600px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Segment style={{ margin: 'auto' }}>
                <div style={{ padding: '10px' }}>
                  <strong>Box Select Tool</strong>
                </div>
                <Button style={{ backgroundColor: 'rgb(36,36,36)', padding: 0, marginLeft: 15 }}>
                  <div ref={sketchViewRef} className={'sketchViewRef'}></div>
                </Button>
              </Segment>
            </div>
            <Segment>
              <Header as='h5'>Preview of selected region</Header>
              <Image
                src={regionSelected ? regionImage : 'https://react.semantic-ui.com/images/wireframe/image.png'}
                size='medium'
                centered
              ></Image>
            </Segment>
            <Segment>
              <Header as='h5'>Specified Extent</Header>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <span style={{ margin: 'auto' }}>
                  <span style={{ marginRight: 5 }}>Top: &nbsp; &nbsp; &nbsp; &nbsp; </span>
                  <Input
                    type='number'
                    size='mini'
                    style={{ maxWidth: 100 }}
                    onChange={onExtentInputChange}
                    value={outputExtent[0]}
                    index={0}
                  ></Input>
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <span style={{ marginRight: 'auto' }}>
                  <span style={{ marginRight: 5 }}>Left: </span>
                  <Input
                    type='number'
                    size='mini'
                    style={{ maxWidth: 100 }}
                    onChange={onExtentInputChange}
                    value={outputExtent[1]}
                    index={1}
                  ></Input>
                </span>
                <span style={{ marginLeft: 'auto' }}>
                  <span style={{ marginRight: 5 }}>Right: </span>

                  <Input
                    type='number'
                    size='mini'
                    style={{ maxWidth: 100 }}
                    onChange={onExtentInputChange}
                    value={outputExtent[2]}
                    index={2}
                  ></Input>
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <span style={{ margin: 'auto' }}>
                  <span style={{ marginRight: 5 }}>Bottom: </span>
                  <Input
                    type='number'
                    size='mini'
                    style={{ maxWidth: 100 }}
                    onChange={onExtentInputChange}
                    value={outputExtent[3]}
                    index={3}
                  ></Input>
                </span>
              </div>
            </Segment>
          </div>
        </div>
      )}
      {/* END Step 2 - Location */}
      {/* Step 3 - Land Cover */}
      {currentStep === 2 && (
        <div className='wordwrap' style={{ textAlign: 'left' }}>
          <Header as='h3'>Assign habitat suitability values</Header>
          <div style={{ marginBottom: 14 }}>
            The following land cover factors were found in the layer data for this study
            <div>region. Input habitat suitability values for the focal species on a scale</div>
            <div>
              from <b>0 (poorest habitat)</b> to <b>1000 (ideal habitat)</b>.
            </div>
          </div>
          <div style={{ overflowY: 'scroll', maxHeight: '600px' }}>{generateHabitatQualityRows()}</div>
        </div>
      )}
      {/* END Step 3 - Land Cover */}

      {/* Step FINAL - Species  */}
      {currentStep === finalStepIndex && (
        <div style={{ textAlign: 'left' }}>
          <div>
            <Header style={{ display: 'inline-block', marginRight: 10, marginBottom: 10 }} as='h3'>
              Choose Output Maps
            </Header>
            {/* <Popup trigger={<Icon name='info' size='small' circular />} content='Tooltip text' position='right center'></Popup> */}
          </div>
          <div className='wordwrap' style={{ marginBottom: 14 }}>
            Select which output maps you would like generated.
          </div>
          <div style={{ paddingBottom: 10 }}>
            <Checkbox
              as={'h5'}
              label='Road Mortality Hotspot Map'
              onChange={onCheckboxHotspot}
              defaultChecked={outputMapDict![props.editingMapId].outputTypes['hotspots']}
            />
          </div>
          <div>
            <Checkbox
              as={'h5'}
              label='Connectivity Map'
              onChange={onCheckboxConnectivity}
              defaultChecked={outputMapDict![props.editingMapId].outputTypes['connectivity']}
            />
          </div>

          <Header style={{ display: 'inline-block', marginRight: 10, marginBottom: 10 }} as='h3'>
            Output Name
          </Header>
          <Input value={outputName} fluid size={'large'} placeholder='Enter a name for the output' onChange={onOutputNameChange} />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            {!props.isEditingExistingOutput && (
              <Button size={'big'} onClick={onGenerateNewMap} disabled={disableGenerateMap}>
                GENERATE MAP
              </Button>
            )}
            {props.isEditingExistingOutput && (
              <div>
                <Button size={'big'} onClick={onGenerateEditMapModal} disabled={disableGenerateMap}>
                  RE-GENERATE MAP
                </Button>
                <Modal closeIcon size={'mini'} open={modalOpen} onClose={() => setModalOpen(false)}>
                  <Modal.Header>Overwrite or Save As?</Modal.Header>
                  <Modal.Content>
                    <p>Would you like to overwrite the output map you are editing, or would you like to save as a new output map?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button positive onClick={() => onGenerateEditMap(true)}>
                      Overwrite Existing
                    </Button>
                    <Button positive onClick={() => onGenerateEditMap(false)}>
                      Save As New
                    </Button>
                  </Modal.Actions>
                </Modal>
              </div>
            )}
          </div>
        </div>
      )}
      {/* END Step FINAL - Species  */}
      {/* Footer */}
      <Menu borderless style={{ boxShadow: 'none', border: 'none', borderRadius: 0, marginTop: 'auto', paddingBottom: 10 }}>
        <Menu.Item position='left' style={{ paddingLeft: 0, paddingRight: 0 }}>
          {currentStep === 0 && <Button onClick={onCancel}> Cancel</Button>}
          {currentStep > 0 && <Button onClick={onBack}> Back</Button>}
        </Menu.Item>
        <Menu.Item position='right' style={{ paddingLeft: 0, paddingRight: 0 }}>
          {currentStep === 0 && (
            <Button onClick={onNext} disabled={speciesName === ''}>
              Next
            </Button>
          )}
          {currentStep === 1 && (
            <Button onClick={onNext} disabled={!regionSelected}>
              Next
            </Button>
          )}
          {currentStep === 2 && <Button onClick={onNext}>Next</Button>}
        </Menu.Item>
      </Menu>
      {/* END Footer */}
    </div>
  );
};

export default SetupOutputMap;
