import React, { ChangeEvent } from 'react';
import { Step, Button, Menu, Input, Header, Popup, Icon, Checkbox, Container } from 'semantic-ui-react';
import { OutputContext } from '../../../../OutputProvider';
import Sketch from '@arcgis/core/widgets/Sketch';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Legend from '@arcgis/core/widgets/Legend';
import HabitatQualityRow from './HabitatQualityRow';
import { setConstantValue } from 'typescript';

const SetupOutputMap = (props: any) => {
  const { outputMapDict } = React.useContext(OutputContext);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [loadedSketch, SetLoadedSketch] = React.useState(false);
  const [disableGenerateMap, setDisableGenerateMap] = React.useState(true);
  const [speciesName, setSpeciesName] = React.useState('');
  const [outputName, setOutputName] = React.useState('');
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
            rectangle: false,
            circle: false,
          },
          selectionTools: {
            'rectangle-selection': true,
            'lasso-selection': false,
          },
        },
      });
    }
  });

  React.useEffect(() => {
    setSpeciesName(outputMapDict![props.editingMapId].speciesName);
    setOutputName(outputMapDict![props.editingMapId].outputName);
    setDisableGenerateMap(outputMapDict![props.editingMapId].outputName.length === 0);
  }, []);
  const onCancel = () => {
    props.setIsEditingOutput(false);
    props.setIsEditingExistingOutput(false);
  };

  const onBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
    SetLoadedSketch(false);
  };

  const onNext = () => {
    if (currentStep === finalStepIndex) return;
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
    if (Object.keys(outputMapDict!).length > 0) {
      outputMapDict![props.editingMapId].speciesName = data.value;
    }
  };

  const onSelectRegionButton = () => {
    return;
  };

  const onOutputNameChange = (event: ChangeEvent, data: any) => {
    setOutputName(data.value);
    if (Object.keys(outputMapDict!).length > 0) {
      outputMapDict![props.editingMapId].outputName = data.value;
    }
    setDisableGenerateMap(data.value.length === 0);
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

  const onGenerateMap = () => {
    console.log('generating map');
    props.onSetupOutputComplete(props.editingMapId, outputName);
  };

  const setHabitatQualityValue = (landCover: string, newValue: number) => {
    outputMapDict![props.editingMapId].habitatQualityValues[landCover] = newValue;
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
          .esri-sketch__section:first-child{
            padding: 0;
            margin: 0;
          }
          .esri-icon-cursor-marquee{
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
            <Popup trigger={<Icon name='info' size='small' circular />} content='Tooltip text' position='right center'></Popup>
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
            <div>map using the box tool below.</div>
          </div>
          {/* <Button icon='pen square' onClick={onSelectRegionButton}></Button> */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button style={{ backgroundColor: 'rgb(36,36,36)', padding: 0 }}>
              <div ref={sketchViewRef} className={'sketchViewRef'}></div>
            </Button>
            <div style={{ padding: '10px' }}>Box Select Tool</div>
          </div>
          <div style={{ textAlign: 'center' }}></div>
        </div>
      )}
      {/* END Step 2 - Location */}
      {/* Step 3 - Land Cover */}
      {currentStep === 2 && (
        <div className='wordwrap' style={{ textAlign: 'left' }}>
          <Header as='h3'>Assign land cover values</Header>
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
            <Popup trigger={<Icon name='info' size='small' circular />} content='Tooltip text' position='right center'></Popup>
          </div>
          <div className='wordwrap' style={{ marginBottom: 14 }}>
            Select which output maps you would like generated.
          </div>
          <div>
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
            <Button size={'big'} onClick={onGenerateMap} disabled={disableGenerateMap}>
              {props.isEditingExistingOutput ? 'RE-GENERATE MAP' : 'GENERATE MAP'}
            </Button>
          </div>
        </div>
      )}
      {/* END Step FINAL - Species  */}
      {/* Footer */}
      <Menu borderless style={{ boxShadow: 'none', border: 'none', borderRadius: 0, marginTop: 'auto' }}>
        <Menu.Item position='left'>
          {currentStep === 0 && <Button onClick={onCancel}> Cancel</Button>}
          {currentStep > 0 && <Button onClick={onBack}> Back</Button>}
        </Menu.Item>
        <Menu.Item position='right'>{currentStep < finalStepIndex && <Button onClick={onNext}> Next</Button>}</Menu.Item>
      </Menu>
      {/* END Footer */}
    </div>
  );
};

export default SetupOutputMap;
