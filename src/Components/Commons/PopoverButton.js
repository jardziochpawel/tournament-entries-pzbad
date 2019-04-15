import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class PopoverButton extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    trimByWord(sentence) {
        let result = sentence;
        let resultArray = result.split(" ");
        if(resultArray.length > 7){
            resultArray = resultArray.slice(0, 7);
            result = resultArray.join(" ") + "…";
        }
        return result;
    }
    render() {

        const {tournament, points, pzbadId} = this.props;
        return (
            <div onMouseOver={()=>this.toggle()} onMouseOut={()=>this.setState({popoverOpen: false})}>
                <button id={'Popover'+tournament.id+'-'+pzbadId.replace(/ /g,"_")}  className='btn btn-link'>
                    {points}
                </button>
                <Popover placement="top" isOpen={this.state.popoverOpen} target={'Popover'+tournament.id+'-'+pzbadId.replace(/ /g,"_")}>
                    <PopoverHeader>#{tournament.id} - {tournament.name}</PopoverHeader>
                    <PopoverBody>{this.trimByWord(tournament.place)}</PopoverBody>
                </Popover>
            </div>
        );
    }
}