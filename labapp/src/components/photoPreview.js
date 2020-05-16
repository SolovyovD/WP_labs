import React from 'react';

export default class PhotoPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            color: 'Выберите цвет',
            size: 'Выберите размер',
            resultIsRecieved: false,
            recievedPage: ''
        };
    }

    recievePicture(event) {
        event.preventDefault();
        fetch('http://localhost:8888/picture/' + this.props.name + '/' + this.props.id + '/' + this.props.color + '/' + this.props.size, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({ recievedPage: result.page });
                this.setState({ resultIsRecieved: true });
            });
    }

    render() {
        return (
            <div style={this.props.visible ? null : styles.body}>
                <div>
                    <button onClick={event => this.recievePicture(event)} style={styles.button}>Отобразить картинку</button>
                </div>
                <div style={{marginTop: 24}} dangerouslySetInnerHTML={{ __html: this.state.recievedPage }} />
            </div>
        )
    }
}

const styles = {
    body: {
        display: 'none',
    },
    button: {
        width: '302px',
        height: '24px',
        marginTop: '8px'
    }
}