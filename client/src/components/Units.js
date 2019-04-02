import React from "react";


class Units extends React.Component {
    renderUnits = () => {
        return this.props.units.map((unit) => {
            return <div className="unit" >{unit.name}</div>
        })
    }

    render() {
        return(
            <div className="units-container">
                {this.renderUnits()}
            </div>
        )
    }
}



export default Units;