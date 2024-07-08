import { Component } from "react";
import withRouter from "./withRouter";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            color: '',
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const {id, name, color} = this.state;
        const url = id ? `http://127.0.0.1:8000/api/update-flowers/${id}` : "http://127.0.0.1:8000/api/send-flowers"
        const method = id ? `PUT` : 'POST'; 

        fetch(url, {method,
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({
                name,
                color
            }),
        })
            .then(response => response.json())
            .then(data => {
                id ? alert("Success updated Flower!") : alert("Success add new Flower!");
                this.setState({name: '', color: ''});
                window.location.href = '/blogs';
            })
            .catch(error => console.error('error', error));
    };

    fetchDataById = async (id) => {
        fetch(`http://127.0.0.1:8000/api/show-flowers/${id}`)
        .then(response => response.json())
        .then(data => this.setState({
            id: data.dataJSON.id,
            name: data.dataJSON.name,
            color: data.dataJSON.color
        }));
    }

    componentDidMount() {
        const { id } = this.props.params;
        console.log(id);
        if (id) {
            this.fetchDataById(id)
        }
    }
    



    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <table class="table mt-4">
                        <tr>
                            <td width="200">Name</td>
                            <td width="1">:</td>
                            <td><input type="text" value={this.state.name} onChange={this.handleChange} name="name" class="form-control" /></td>
                        </tr>
                        <tr>
                            <td width="200">Color</td>
                            <td width="1">:</td>
                            <td><input type="text" value={this.state.color} onChange={this.handleChange} name="color" class="form-control" /></td>
                        </tr>
                    </table>
                    <div className="d-flex justify-content-end mt-4">
                        <button type="submit" class="btn btn-success">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(Create);