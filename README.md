# Wildlife Hotspots

A University of Waterloo [Engineering Capstone Design Project](https://uwaterloo.ca/capstone-design/)

[Link to the tool](http://uwaterloo-wildlife-modeling.web.app/)

# For developers

### Running locally

`npm run start`

### Testing

### Folder Structure

- `assets/` - static data like images
- `components/` - For standalone views that don't require complex view controller and layout.
- `constants/` - constant values like reducer action types
- `containers/` - Acts as a view controller. Manages components from layout. Contains the tests.
- `context/` - React context using Reducer
- `layout` - The "dumb" view that provides the html to render the UI
- `routes` - For React Router
- `utils` - Random useful JS functions
