import { Component } from "react";

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  
  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/flowers')
    .then(response => response.json())
    .then(data => this.setState({data: data.dataJSON}));
  }

  handleDelete = async (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus data ini?')
    if (confirmed) {
        fetch('http://127.0.0.1:8000/api/delete-flowers/'+id,{ method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert("Data berhasil dihapus");
            this.setState(prevState => ({
                data: prevState.data.filter(item => item.id !== id)
            }))
        })
        .catch(error => console.error('Error', error));
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Blogs</h1>
        <p>Ini adalah halaman Blogs</p>
        <div className="d-flex justify-content-start mt-3">
            <a class="btn btn-primary" href="create" >Tambah</a>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Flower</th>
              <th>Color</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.color}</td>
                <td>
                    <button onClick={() => this.handleDelete(item.id)} class="btn btn-danger">DELETE</button>
                    <a href={`update/${item.id}`} class="btn btn-secondary">UPDATE</a>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Blogs;
