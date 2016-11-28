import React from 'react';

const component = props => (
  <div>
    {/* do something with props */}
  </div>
)

component.displayName = 'component';

const { shape } = React.PropTypes;

component.propTypes = {
  props: shape({})
};

export default component;
