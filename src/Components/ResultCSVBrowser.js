import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import CSVIcon from '../img/File-CSV-icon.png';
import DocIcon from '../img/doc-ico.png';
import ImageIcon from '../img/image-ico.png';
import PDFIcon from "../img/pdf-icon-1.png";

export class ResultCSVBrowser extends React.Component {

    imageRender(url){
        const fileFormat =  url.match(/[^.]+$/)[0];
        console.log(fileFormat);
        switch (fileFormat.toLocaleLowerCase()) {
            case 'doc':
            case 'docx':
                return <img src={DocIcon} className="img-fluid" alt='doc-ico'/>;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <img src={ImageIcon} className="img-fluid" alt='img-ico'/>;
            case 'csv':
                return <img src={CSVIcon} className="img-fluid" alt='csv-ico'/>;
            case 'pdf':
                return <img src={PDFIcon} className="img-fluid" alt='csv-ico'/>;
            default:
                return <img src={PDFIcon} className="img-fluid" alt='csv-ico'/>;
        }
    }

    render() {
    const {images, deleteHandler, isLocked} = this.props;

    return (
      <div className="row mt-4 mb-4">
        <TransitionGroup component={null}>
          {
            images.map(image => {
              const onImageDeleteClick = (event) => {
                event.preventDefault();
                deleteHandler(image.id);
              };
              return (
                <CSSTransition timeout={1000} classNames="fade" key={image.id}>
                  <div className="col-md-6 col-lg-4">
                    <div className="mt-2 mb-2">
                        {this.imageRender(image.url)}

                           <small>{image.url}</small>
                    </div>
                    <div className="mb-2">
                      <button type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={onImageDeleteClick}
                              disabled={isLocked}>Remove</button>
                    </div>
                  </div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
      </div>
    )
  }
}
