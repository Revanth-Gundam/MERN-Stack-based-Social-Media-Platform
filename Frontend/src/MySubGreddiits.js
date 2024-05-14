import { useState, useEffect } from 'react';
import api from './api/api';

import { useNavigate } from 'react-router-dom';

const MySubgreddiits = () => {
  const [subgreddiits, setSubgreddiits] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    banned_Words: '',
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchSubgreddiits = async () => {
      try {
        const response = await api.get('/api/subgreddiit/list/my');
        setSubgreddiits(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubgreddiits();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await api.post('/api/subgreddiit/create', formData);
      console.log(res.data);
      setSubgreddiits([...subgreddiits, res.data]);
      setEditMode(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleDelete = async (subgreddiitId) => {
    try {
      const res = await api.delete(`/api/subgreddiit/delete/${subgreddiitId}`);
      console.log(res.data);
      setSubgreddiits(subgreddiits.filter(subgreddiit => subgreddiit._id !== subgreddiitId));
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = () => {
    return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name" style={{ marginBottom: "5px", fontWeight: "bold" }}>Name:</label>
          <input type="text" id="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description" style={{ marginBottom: "5px", fontWeight: "bold" }}>Description:</label>
          <input type="text" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="tags" style={{ marginBottom: "5px", fontWeight: "bold" }}>Tags (separated by commas):</label>
          <input type="text" id="tags" value={formData.tags} onChange={(event) => setFormData({ ...formData, tags: event.target.value })} style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="banned_Words" style={{ marginBottom: "5px", fontWeight: "bold" }}>Banned Words (separated by commas):</label>
          <input type="text" id="banned_Words" value={formData.banned_Words} onChange={(event) => setFormData({ ...formData, banned_Words: event.target.value })} style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>
        <button type="submit" style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#008CBA", color: "#fff", border: "none" }}>Create</button>
      </form>
    );
  };

  const renderSubgreddiits = () => {
    return subgreddiits.map((subgreddiit) => (
      <div key={subgreddiit._id} style={{ border: '1px solid black', padding: 10, marginBottom: 10 }}>
        <h2 style={{ fontSize: 20 }}>{subgreddiit.name}</h2>
        <p style={{ fontWeight: 'bold' }}>{subgreddiit.description}</p>
        <p style={{ fontWeight: 'bold' }}>Number of posts: {subgreddiit.posts.length}</p>
        <p style={{ fontWeight: 'bold' }}>Number of users: {subgreddiit.users.filter(user => user.status === 'joined' || user.status === 'moderator').length}</p>
        <p style={{ fontWeight: 'bold' }}>Banned words: {subgreddiit.banned_Words.join(', ')}</p>
        
            <button onClick={() => handleDelete(subgreddiit._id)}
        variant="contained"
        style={{ margin: '3px', marginBottom: '2px', backgroundColor: 'red', '&:hover': { backgroundColor: 'yellow' } }}>
        Delete
        </button>
        <button onClick={() => navigate('/subgreddiit/' + subgreddiit._id)}
        
        variant="contained"
      //   styles={{ mt: 3, mb: 2 }}
      style={{ margin: '3px', marginBottom: '2px' , backgroundColor: "red", "&:hover": { backgroundColor: 'yellow'}}}
        >Open</button>
      </div>
    ));
  };

  return (
    <>
      <div>
        {editMode ? renderForm() : <button onClick={() => setEditMode(true)}>Create Subgreddiit</button>}
      </div>
      <div style={{ margin: 30 }}>
        <h2>My Subgreddiits</h2>
        {renderSubgreddiits()}
      </div>
    </>
  );
};

export default MySubgreddiits;