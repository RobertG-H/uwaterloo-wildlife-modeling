# Wildlife Hotspots

A University of Waterloo [Engineering Capstone Design Project](https://uwaterloo.ca/capstone-design/)

"Wildlife Hotspots" assists ecologists by highlighting hotspots of animal movement and identifying potential risks of road mortality. Wildlife connectivity models are important to ecologists during the planning of new development projects because they can help determine the placement or need of wildlife crossings. Current tools are not widely used due to their low usability and a high technical barrier-to-entry. Wildlife Hotspot’s goal is to combine complex wildlife modeling with geographic information systems in a usable way to help the planning process of new developments.

![tool1](https://github.com/RobertG-H/uwaterloo-wildlife-modeling/blob/main/screenshots/Wildlife%20Hotspots%20Image%20Submission%20(1).png)

![tool2](https://github.com/RobertG-H/uwaterloo-wildlife-modeling/blob/main/screenshots/Wildlife%20Hotspots%20Image%20Submission%20(4).png)

[Link to the tool](http://uwaterloo-wildlife-modeling.web.app/)

# For developers

### Running locally

`npm run start`

### Testing

`npm run test`

### Folder Structure

- `assets/` - static data like images
- `components/` - For standalone views that don't require complex view controller and layout.
- `constants/` - constant values like reducer action types
- `containers/` - Acts as a view controller. Manages components from layout. Contains the tests.
- `context/` - React context using Reducer
- `layout` - The "dumb" view that provides the html to render the UI
- `routes` - For React Router
- `utils` - Random useful JS functions
