import React from 'react'
import moment from "moment";
import axios from "axios";
import  { Button} from  "reactstrap";

export default class YtVideoCommEditor extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props.row)
      console.log(this.props)
      console.log(this.props.row['name'])
      console.log(this.props.user)
      // console.log(this.props.auth.name)
      console.log(this.props.row['yt_video_date'])

      this.updateData = this.updateData.bind(this);
      this.state = {
        name: props.defaultValue,
        open: true,
        marodate:this.props.row['yt_video_date'],
        date: moment().format("DD-MM-YYYY hh:mm:ss"),
        influencer:this.props.row['name'],
        prop_row:this.props.row,
        username:this.props.user
      };
    }
    focus() {
      this.refs.inputRef.focus();
    }
    updateData() {
      console.log(this.state.username)
      this.props.onUpdate(this.state.name, this.state.marodate);
      console.log(this.state.marodate)
      console.log(this.state.prop_row)
      // this.props.onUpdate(this.state.yt_video_date);
      // var date= moment().format("DD-MM-YYYY hh:mm:ss")
      console.log(this.state.date)
      console.log(this.state.name)
      console.log(this.state.marodate)
      const date=this.state.date;
      const field="yt_video";
      const field_date="yt_video_date";
      const value=this.state.name;
      const influencer=this.state.influencer;
      const userUpdatedField= "yt_updated_by"

      // const func = this.props.updateOnCommercial()
     

      axios({
        method: 'post',
        url: "/api/influencers/set_influencer_rate",
        data: {
            field:field,
            value:value,
            field_date:field_date,
            date:date,
            influencer: influencer,
            user:this.state.username,
            userUpdatedField:userUpdatedField
        }
        })
        .then(function (response) {
        console.log(response);
        // func()
       
    
        })
      
        .catch(function (error) {
        console.log(error);
        });
  
    }
    close = () => {
      this.setState({ open: false });
      this.props.onUpdate(this.props.defaultValue);
      console.log(this.state.username)
    }
  //   test(krishna) {
  //     console.log(krishna)
  //     // return user.name;
  //     // this.setState({username:krishna})
  //     console.log(this.state.username)
     
  // }
    render() {
    
      const fadeIn = this.state.open ? 'in' : '';
      const display = this.state.open ? 'block' : 'none';
      // const { user } = this.props.auth;
      // const krishna = user.name
      // console.log(krishna)
      return (

        <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
          <div className='modal-dialog1221'>
            <div className='modal-content12'>
              <div className='modal-body'>
                  <p style={{fontSize:"1em", fontWeight:"500"}}>Enter A New Influencer Commercial For Youtube Video  </p>
                <input
                  ref='inputRef'
                  className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                  style={ { display: 'inline', width: '50%' } }
                  type='number'
                  value={ this.state.name }
                  onChange={ e => { this.setState({ name: e.currentTarget.value, marodate:moment().format("DD-MM-YYYY hh:mm:ss") }); } } />
              </div>
              <div className='modal-footer'>
                <Button className='dash-button' onClick={ this.close }>Close</Button>
                <Button className='dash-button' onClick={ this.updateData }>Save</Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export class InstaStoryCommEditor extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props.row['name'])
      this.updateData = this.updateData.bind(this);
      this.state = {
        name: props.defaultValue,
        open: true,
        date: moment().format("DD-MM-YYYY hh:mm:ss"),
        influencer:this.props.row['name'],
        username:this.props.user
      };
    }
    focus() {
      this.refs.inputRef.focus();
    }
    updateData() {
      this.props.onUpdate(this.state.name);
      // var date= moment().format("DD-MM-YYYY hh:mm:ss")
      console.log(this.state.date)
      console.log(this.state.name)
      const date=this.state.date;
      const field="insta_st";
      const field_date="insta_st_date";
      const value=this.state.name;
      const influencer=this.state.influencer;
  const userUpdatedField= "insta_st_updated_by"
      
  // const func = this.props.updateOnCommercial()
  
      axios({
        method: 'post',
        url: "/api/influencers/set_influencer_rate",
        data: {
            field:field,
            value:value,
            field_date:field_date,
            date:date,
            influencer: influencer,
            user:this.state.username,
            userUpdatedField: userUpdatedField
        }
        })
        .then(function (response) {
        console.log(response);
        // func()
    
        })
      
        .catch(function (error) {
        console.log(error);
        });
  
    }
    close = () => {
      this.setState({ open: false });
      this.props.onUpdate(this.props.defaultValue);
    }
    render() {
      const fadeIn = this.state.open ? 'in' : '';
      const display = this.state.open ? 'block' : 'none';
  
      return (
        <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
          <div className='modal-dialog1221'>
            <div className='modal-content12'>
              <div className='modal-body'>
              <p style={{fontSize:"1em", fontWeight:"500"}}>Enter A New Influencer Commercial For Instagram Story </p>
                <input
                  ref='inputRef'
                  className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                  style={ { display: 'inline', width: '50%' } }
                  type='text'
                  value={ this.state.name }
                  onChange={ e => { this.setState({ name: e.currentTarget.value }); } } />
              </div>
              <div className='modal-footer'>
                <Button className='dash-button' onClick={ this.close }>Close</Button>
                <Button className='dash-button' onClick={ this.updateData }>Save</Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export class InstaStaticPstCommEditor extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props.row['name'])
      this.updateData = this.updateData.bind(this);
      this.state = {
        name: props.defaultValue,
        open: true,
        date: moment().format("DD-MM-YYYY hh:mm:ss"),
        influencer:this.props.row['name'],
        username:this.props.user
      };
    }
    focus() {
      this.refs.inputRef.focus();
    }
    updateData() {
      this.props.onUpdate(this.state.name);
      // var date= moment().format("DD-MM-YYYY hh:mm:ss")
      console.log(this.state.date)
      console.log(this.state.name)
      const date=this.state.date;
      const field="insta_static";
      const field_date="insta_static_date";
      const value=this.state.name;
      const influencer=this.state.influencer;
      const userUpdatedField="insta_static_updated_by"
      // const func = this.props.updateOnCommercial()
      axios({
        method: 'post',
        url: "/api/influencers/set_influencer_rate",
        data: {
            field:field,
            value:value,
            field_date:field_date,
            date:date,
            influencer: influencer,
            user:this.state.username,
            userUpdatedField:userUpdatedField
        }
        })
        .then(function (response) {
        console.log(response);
          // func()
        })
      
        .catch(function (error) {
        console.log(error);
        });
  
    }
    close = () => {
      this.setState({ open: false });
      this.props.onUpdate(this.props.defaultValue);
    }
    render() {
      const fadeIn = this.state.open ? 'in' : '';
      const display = this.state.open ? 'block' : 'none';
  
      return (
        <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
          <div className='modal-dialog1221'>
            <div className='modal-content12'>
              <div className='modal-body'>
              <p style={{fontSize:"1em", fontWeight:"500"}}>Enter A New Influencer Commercial For Instagram Static Post </p>
                <input
                  ref='inputRef'
                  className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                  style={ { display: 'inline', width: '50%' } }
                  type='text'
                  value={ this.state.name }
                  onChange={ e => { this.setState({ name: e.currentTarget.value }); } } />
              </div>
              <div className='modal-footer'>
                <Button className='dash-button' onClick={ this.close }>Close</Button>
                <Button className='dash-button' onClick={ this.updateData }>Save</Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  

  export class InstaVideoPostCommEditor extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props.row['name'])
      this.updateData = this.updateData.bind(this);
      this.state = {
        name: props.defaultValue,
        open: true,
        date: moment().format("DD-MM-YYYY hh:mm:ss"),
        influencer:this.props.row['name'],
        username:this.props.user
      };
    }
    focus() {
      this.refs.inputRef.focus();
    }
    updateData() {
      this.props.onUpdate(this.state.name);
      // var date= moment().format("DD-MM-YYYY hh:mm:ss")
      console.log(this.state.date)
      console.log(this.state.name)
      const date=this.state.date;
      const field="insta_video";
      const field_date="insta_video_date";
      const value=this.state.name;
      const influencer=this.state.influencer;
  const userUpdatedField= "insta_video_updated_by"
  // const func = this.props.updateOnCommercial()
  
      axios({
        method: 'post',
        url: "/api/influencers/set_influencer_rate",
        data: {
            field:field,
            value:value,
            field_date:field_date,
            date:date,
            influencer: influencer,
            user:this.state.username,
            userUpdatedField:userUpdatedField
        }
        })
        .then(function (response) {
        console.log(response);
        // func()
    
        })
      
        .catch(function (error) {
        console.log(error);
        });
  
    }
    close = () => {
      this.setState({ open: false });
      this.props.onUpdate(this.props.defaultValue);
    }
    render() {
      const fadeIn = this.state.open ? 'in' : '';
      const display = this.state.open ? 'block' : 'none';
  
      return (
        <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
          <div className='modal-dialog1221'>
            <div className='modal-content12'>
              <div className='modal-body'>
              <p style={{fontSize:"1em", fontWeight:"500"}}>Enter A New Influencer Commercial For Instagram Video Post </p>
                <input
                  ref='inputRef'
                  className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                  style={ { display: 'inline', width: '50%' } }
                  type='text'
                  value={ this.state.name }
                  onChange={ e => { this.setState({ name: e.currentTarget.value   }); } } />
              </div>
              <div className='modal-footer'>
                <Button className='dash-button' onClick={ this.close }>Close</Button>
                <Button className='dash-button' onClick={ this.updateData }>Save</Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }







 /* export default class Total extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props.row['name'])
      console.log(this.props)
     // console.log(this.props.row['yt_video_date'])

      this.updateData = this.updateData.bind(this);
      this.state = {
        name: props.defaultValue,
        open: true,
        //marodate:this.props.row['yt_video_date'],
        //date: moment().format("DD-MM-YYYY hh:mm:ss"),
        influencer:this.props.row['name'],
        prop_row:this.props.row
      };
    }
    focus() {
      this.refs.inputRef.focus();
    }
    updateData() {
      this.props.onUpdate(this.state.name, this.state.marodate);
      
      const date=this.state.date;
      const field="yt_video";
      const field_date="yt_video_date";
      const value=this.state.name;
      const influencer=this.state.influencer;

  

      
  
    }
    close = () => {
      this.setState({ open: false });
      this.props.onUpdate(this.props.defaultValue);
    }
    render() {
      const fadeIn = this.state.open ? 'in' : '';
      const display = this.state.open ? 'block' : 'none';
      return (

        <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
          <div className='modal-dialog1221'>
            <div className='modal-content12'>
              <div className='modal-body'>
                  <p style={{fontSize:"1em", fontWeight:"500"}}>Enter A New Brand Commercial For Youtube Video </p>
                <input
                  ref='inputRef'
                  className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                  style={ { display: 'inline', width: '50%' } }
                  type='number'
                  value={ this.state.name }
                  onChange={ e => { this.setState({ name: e.currentTarget.value, marodate:moment().format("DD-MM-YYYY hh:mm:ss") }); } } />
              </div>
              <div className='modal-footer'>
                <Button className='dash-button' onClick={ this.close }>Close</Button>
                <Button className='dash-button' onClick={ this.updateData }>Save</Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }*/


  // YtVideoCommEditor.propTypes = {
  //   logoutUser: PropTypes.func.isRequired,
  //   auth: PropTypes.object.isRequired
  // };
  // const mapStateToProps = state => ({
  //   auth: state.auth
  // });
  // export default connect(
  //   mapStateToProps,
  //   { logoutUser }
  // )(YtVideoCommEditor, InstaStoryCommEditor);


  // InstaStoryCommEditor.propTypes = {
  //   logoutUser: PropTypes.func.isRequired,
  //   auth: PropTypes.object.isRequired
  // };
  
