/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  PixelRatio,
  ScrollView,
  TouchableOpacity
} from 'react-native';

class Timer extends Component {
   constructor () {
    super();
    this.state = {
      mtime: 0,
      stime: 0,
      xtime: 0,
      mtodo: 0,
      stodo: 0,
      xtodo: 0,
      btn1: true,
      hide: null,
      teams:[],
    }
  }

  start () {
    if (!this.state.btn1) {
      clearInterval(this.timer)
    }
    else {
      this.timer = setInterval(
      this._start.bind(this),
      100)
    }

    this.setState({
      btn1:!this.state.btn1,
    })
  }

  _start () {
    this.setState({
      xtime: this.state.xtime + 1
    })
    if (this.state.xtime + 1 >= 10) {
      this.setState({
        xtime: 0,
        stime: this.state.stime + 1,
      })
    }
    if (this.state.stime + 1 >= 60) {
      this.setState({
        stime: 0,
        mtime: this.state.mtime + 1,
      })
    }
    if (this.state.mtime + 1 >= 60) {
      alert("Time Outer")
    }
  }

  reset(){
    if (this.state.btn1) {
      this.setState({
      mtime: 0,
      stime: 0,
      xtime: 0,
      hide: null,
      teams: [],
      })
    } else {
      this.setState({
        hide: '123',
        teams: this.state.teams.concat({
        mtodo: this.state.mtime,
        stodo: this.state.stime,
        xtodo: this.state.xtime,
      }),
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <ShowTimer 
          mtime={this.state.mtime}
          stime={this.state.stime}
          xtime={this.state.xtime}/>
          <StartTimer 
          start={this.start.bind(this)}
          btn1={this.state.btn1}
          reset={this.reset.bind(this)}
          />
          {this.state.teams.map((team, i) =>
          <Count 
          team={team}
          steam={this.state.teams[i-1]}
          sindex={i-1}
          key={i}
          index={++i}
          hide={this.state.hide}
          />
          )}
      </View>
    );
  }
}
///
class Count extends Component {
  static defaultProps = {
    team: '',
  }
  render() {
    var ltime;
    var ctime;
    var mt;
    var st;
    var mst;
    var ntime = (this.props.team.xtodo * 100) + (this.props.team.stodo * 1000) + (this.props.team.mtodo * 60000)
    if (this.props.sindex >= 0) {
          ltime = (this.props.steam.xtodo * 100) + (this.props.steam.stodo * 1000) + (this.props.steam.mtodo * 60000)
           ctime = ntime - ltime
           mt=parseInt(ctime/60000)
           st=parseInt((ctime-mt*60000)/1000)
           mst=parseInt((ctime-st*1000-mt*60000)/100)
    }
    return (
       <View>
        { this.props.hide === null ? null :
        <View style={{flexDirection:'row'}}>
          <Text>
          计次{this.props.index}.
          </Text>
          <Text style={{marginLeft:40}}>
          {ChangeTimer(this.props.team.mtodo)}
          :{ChangeTimer(this.props.team.stodo)}
          .{this.props.team.xtodo}
          </Text>
          <Text style={{marginLeft:40}}>
          {this.props.sindex >= 0 ? ChangeTimer(mt) : ChangeTimer(this.props.team.mtodo)}
          :{this.props.sindex >= 0 ? ChangeTimer(st) : ChangeTimer(this.props.team.stodo)}
          .{this.props.sindex >= 0 ? mst : this.props.team.xtodo}
          </Text>
        </View>
        }
        </View>
    )
  }
}
///
function ChangeTimer (time) {
  if (time >= 10) {
    return time;
  } else {
    return ("0"+time)
  }
}
///
class ShowTimer extends Component {
  render() {
    return (
        <View>
          <Text style={styles.welcome}>
          {ChangeTimer(this.props.mtime)}
          :{ChangeTimer(this.props.stime)}
          .{this.props.xtime}
          </Text>
        </View>
      )
  }
}

class StartTimer extends Component {
  render() {
    return (
      <View style={styles.button1}>
      <TouchableOpacity style={styles.tBtn} onPress={this.props.start}>
        <View>
          <Text>{this.props.btn1 ? "启动" :"停止"}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tBtn} onPress={this.props.reset}>
        <View>
          <Text>{this.props.btn1 ? "复位" :"计次"}</Text>
        </View>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button1: {
    flexDirection:'row',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    tBtn: {
    marginLeft:40,
    width:60,
    height:60,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
  },
});

AppRegistry.registerComponent('Timer', () => Timer);
