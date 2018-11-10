import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { markParentViewsForCheck } from '@angular/core/src/view/util';

declare var google : any;


/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  map: any; //Manejador del mapa
  coords: any = { lat: 0, lng: 0 };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation) {

    platform.ready().then(() => {
      // La plataforma esta lista y ya tenemos acceso a los plugins
      this.obtenerPosicion();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  obtenerPosicion(): any {
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;
      this.loadMap();
    })
      .catch(
        (error) => {
          console.log(error.message);
          this.coords.lat = 43.2686712;
          this.coords.lng = -2.9340118000000075;
          this.loadMap();
        }
      )
  }

  loadMap(){
    let mapContainer = document.getElementById('map');
    this.map = new google.maps.Map(mapContainer, {center : this.coords, zoom : 12});

    //colocamos el marcador
    //let fileIcon = "C:/Data/Projects/ionic/misSitios/src/assets/imgs/marca-loc.png";
    let latLong = new google.maps.LatLng(this.coords.lat, this.coords.lng);
    let marker = new google.maps.Marker({
      position: latLong,
      title:"Hello World!",
      icon : 'C:/Data/Projects/ionic/misSitios/src/assets/imgs/ico_estoy_aqui.png',      
    });
    marker.setMap(this.map);
  }

}
