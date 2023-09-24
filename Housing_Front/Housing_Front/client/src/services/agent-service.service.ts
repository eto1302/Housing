import {Injectable} from '@angular/core';
import {Agent} from '../models/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  agents: Agent[];


  constructor() {
    this.agents = [
    {
      id: 1,
      name: 'Силвия Гочева',
      photoPath: '../../assets/resources/images/person_1-min.jpg',
      description: '\n' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit rutrum imperdiet. Praesent vel pretium nisi. Suspendisse laoreet est vitae sapien efficitur, eget viverra odio elementum. Nulla mattis nibh et massa accumsan pulvinar. Proin sagittis diam tortor, sed placerat neque luctus at. Mauris elementum interdum consectetur. Mauris nisi augue, porttitor in elit vel, dapibus ultricies erat. Sed tristique eu lorem quis consequat. Curabitur fringilla sed elit a commodo.\n' +
        '\n' +
        'Phasellus consequat libero hendrerit lectus faucibus bibendum. Donec volutpat, odio eget faucibus mollis, metus mi ultrices velit, vel blandit augue risus vitae orci. Integer elementum elementum felis at vulputate. Nunc ut sagittis velit, id malesuada urna. Sed hendrerit a mauris ac fermentum. Quisque vel dolor diam. Nullam vitae euismod ex, vel facilisis lorem.\n' +
        '\n' +
        'Pellentesque convallis dignissim dui, ac congue justo placerat nec. Ut porttitor nec lectus sit amet vestibulum. Nulla tempor ac sapien eget tempor. Ut quis condimentum nibh, quis laoreet dolor. Proin et ipsum varius, blandit nisl id, tempor lacus. Vivamus sodales erat massa, pulvinar eleifend lorem porta at. Mauris pharetra nisi in tortor tincidunt, vel vehicula velit rutrum. Nunc a ligula non mi scelerisque tincidunt. Fusce euismod vel lacus ac sollicitudin. Morbi eu laoreet augue. Etiam ut facilisis sem. Morbi pharetra nibh sit amet ex fringilla congue. Nullam auctor congue turpis, nec luctus arcu interdum in. Phasellus bibendum mauris eget suscipit euismod. Praesent et enim finibus, vestibulum dui quis, gravida orci. Pellentesque sed ex diam.\n' +
        '\n' +
        'Proin vitae dictum massa. Morbi posuere velit non ullamcorper congue. Nullam eget metus massa. Aliquam mollis ipsum sapien, nec sodales magna dignissim et. Aenean non aliquet lorem. Nam vitae mollis elit. Sed aliquam id nisl non porta. Suspendisse porttitor mauris eu nisl egestas, vitae facilisis sapien rutrum. Aenean sit amet semper purus. Nullam ultricies pulvinar aliquam. Nunc scelerisque sed dui vitae bibendum.\n' +
        '\n' +
        'Fusce vel luctus elit. Praesent varius lacus ac dolor egestas rhoncus. In sed accumsan massa. Ut imperdiet felis ut lacus condimentum, ac eleifend enim rutrum. Proin pellentesque ligula eget suscipit semper. Vestibulum ultricies libero eget quam tempor placerat. Nam a dolor ornare, aliquam urna vitae, posuere mauris. Suspendisse pretium imperdiet dolor, nec mollis lectus efficitur eget. Nulla ultrices pretium ex eu tristique. Fusce augue lorem, mollis et velit sed, mattis volutpat leo. Donec euismod felis tellus, quis tincidunt arcu sagittis sit amet. Nulla eu pulvinar massa. Curabitur vel quam nec diam condimentum feugiat vel eget neque.\n' +
        '\n' +
        'Fusce ultrices enim ut rutrum viverra. Integer condimentum sodales magna, eget viverra magna ornare quis. Suspendisse non pretium neque, eu egestas nibh. Nunc tincidunt velit convallis mattis pulvinar. Vestibulum eget diam ultricies, aliquet neque eu, euismod risus. Sed viverra feugiat quam quis rutrum. Donec non scelerisque erat, laoreet blandit elit. Maecenas commodo leo eu tellus interdum fringilla. Donec eu semper lorem. Integer ac enim congue, tristique urna posuere, condimentum nulla. Quisque ultricies purus et libero semper ornare. Nunc consequat fermentum ullamcorper. Quisque maximus dui a pellentesque imperdiet.',
      shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n' + 'Facere officiis inventore cumque tenetur laboriosam, minus\n' + 'culpa doloremque odio, neque molestias?',
      facebookLink: 'www.facebook.com',
      youtubeLink: 'www.youtube.com',
      instagramLink: 'www.instagram.com',
      tiktokLink: 'www.tiktok.com',
      linkedInLink: 'www.linkedin.com',
      rating: 5

    },
    {
      id: 2,
      name: 'Agent 1',
      photoPath: '../../assets/resources/images/person_2-min.jpg',
      description: '\n' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit rutrum imperdiet. Praesent vel pretium nisi. Suspendisse laoreet est vitae sapien efficitur, eget viverra odio elementum. Nulla mattis nibh et massa accumsan pulvinar. Proin sagittis diam tortor, sed placerat neque luctus at. Mauris elementum interdum consectetur. Mauris nisi augue, porttitor in elit vel, dapibus ultricies erat. Sed tristique eu lorem quis consequat. Curabitur fringilla sed elit a commodo.\n' +
        '\n' +
        'Phasellus consequat libero hendrerit lectus faucibus bibendum. Donec volutpat, odio eget faucibus mollis, metus mi ultrices velit, vel blandit augue risus vitae orci. Integer elementum elementum felis at vulputate. Nunc ut sagittis velit, id malesuada urna. Sed hendrerit a mauris ac fermentum. Quisque vel dolor diam. Nullam vitae euismod ex, vel facilisis lorem.\n' +
        '\n' +
        'Pellentesque convallis dignissim dui, ac congue justo placerat nec. Ut porttitor nec lectus sit amet vestibulum. Nulla tempor ac sapien eget tempor. Ut quis condimentum nibh, quis laoreet dolor. Proin et ipsum varius, blandit nisl id, tempor lacus. Vivamus sodales erat massa, pulvinar eleifend lorem porta at. Mauris pharetra nisi in tortor tincidunt, vel vehicula velit rutrum. Nunc a ligula non mi scelerisque tincidunt. Fusce euismod vel lacus ac sollicitudin. Morbi eu laoreet augue. Etiam ut facilisis sem. Morbi pharetra nibh sit amet ex fringilla congue. Nullam auctor congue turpis, nec luctus arcu interdum in. Phasellus bibendum mauris eget suscipit euismod. Praesent et enim finibus, vestibulum dui quis, gravida orci. Pellentesque sed ex diam.\n' +
        '\n' +
        'Proin vitae dictum massa. Morbi posuere velit non ullamcorper congue. Nullam eget metus massa. Aliquam mollis ipsum sapien, nec sodales magna dignissim et. Aenean non aliquet lorem. Nam vitae mollis elit. Sed aliquam id nisl non porta. Suspendisse porttitor mauris eu nisl egestas, vitae facilisis sapien rutrum. Aenean sit amet semper purus. Nullam ultricies pulvinar aliquam. Nunc scelerisque sed dui vitae bibendum.\n' +
        '\n' +
        'Fusce vel luctus elit. Praesent varius lacus ac dolor egestas rhoncus. In sed accumsan massa. Ut imperdiet felis ut lacus condimentum, ac eleifend enim rutrum. Proin pellentesque ligula eget suscipit semper. Vestibulum ultricies libero eget quam tempor placerat. Nam a dolor ornare, aliquam urna vitae, posuere mauris. Suspendisse pretium imperdiet dolor, nec mollis lectus efficitur eget. Nulla ultrices pretium ex eu tristique. Fusce augue lorem, mollis et velit sed, mattis volutpat leo. Donec euismod felis tellus, quis tincidunt arcu sagittis sit amet. Nulla eu pulvinar massa. Curabitur vel quam nec diam condimentum feugiat vel eget neque.\n' +
        '\n' +
        'Fusce ultrices enim ut rutrum viverra. Integer condimentum sodales magna, eget viverra magna ornare quis. Suspendisse non pretium neque, eu egestas nibh. Nunc tincidunt velit convallis mattis pulvinar. Vestibulum eget diam ultricies, aliquet neque eu, euismod risus. Sed viverra feugiat quam quis rutrum. Donec non scelerisque erat, laoreet blandit elit. Maecenas commodo leo eu tellus interdum fringilla. Donec eu semper lorem. Integer ac enim congue, tristique urna posuere, condimentum nulla. Quisque ultricies purus et libero semper ornare. Nunc consequat fermentum ullamcorper. Quisque maximus dui a pellentesque imperdiet.',
      shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n' + 'Facere officiis inventore cumque tenetur laboriosam, minus\n' + 'culpa doloremque odio, neque molestias?',
      facebookLink: 'www.facebook.com',
      youtubeLink: 'www.youtube.com',
      instagramLink: 'www.instagram.com',
      tiktokLink: 'www.tiktok.com',
      linkedInLink: 'www.linkedin.com',
      rating: 2
    },
    {
      id: 3,
      name: 'Agent 2',
      photoPath: '../../assets/resources/images/person_3-min.jpg',
      description: '\n' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit rutrum imperdiet. Praesent vel pretium nisi. Suspendisse laoreet est vitae sapien efficitur, eget viverra odio elementum. Nulla mattis nibh et massa accumsan pulvinar. Proin sagittis diam tortor, sed placerat neque luctus at. Mauris elementum interdum consectetur. Mauris nisi augue, porttitor in elit vel, dapibus ultricies erat. Sed tristique eu lorem quis consequat. Curabitur fringilla sed elit a commodo.\n' +
        '\n' +
        'Phasellus consequat libero hendrerit lectus faucibus bibendum. Donec volutpat, odio eget faucibus mollis, metus mi ultrices velit, vel blandit augue risus vitae orci. Integer elementum elementum felis at vulputate. Nunc ut sagittis velit, id malesuada urna. Sed hendrerit a mauris ac fermentum. Quisque vel dolor diam. Nullam vitae euismod ex, vel facilisis lorem.\n' +
        '\n' +
        'Pellentesque convallis dignissim dui, ac congue justo placerat nec. Ut porttitor nec lectus sit amet vestibulum. Nulla tempor ac sapien eget tempor. Ut quis condimentum nibh, quis laoreet dolor. Proin et ipsum varius, blandit nisl id, tempor lacus. Vivamus sodales erat massa, pulvinar eleifend lorem porta at. Mauris pharetra nisi in tortor tincidunt, vel vehicula velit rutrum. Nunc a ligula non mi scelerisque tincidunt. Fusce euismod vel lacus ac sollicitudin. Morbi eu laoreet augue. Etiam ut facilisis sem. Morbi pharetra nibh sit amet ex fringilla congue. Nullam auctor congue turpis, nec luctus arcu interdum in. Phasellus bibendum mauris eget suscipit euismod. Praesent et enim finibus, vestibulum dui quis, gravida orci. Pellentesque sed ex diam.\n' +
        '\n' +
        'Proin vitae dictum massa. Morbi posuere velit non ullamcorper congue. Nullam eget metus massa. Aliquam mollis ipsum sapien, nec sodales magna dignissim et. Aenean non aliquet lorem. Nam vitae mollis elit. Sed aliquam id nisl non porta. Suspendisse porttitor mauris eu nisl egestas, vitae facilisis sapien rutrum. Aenean sit amet semper purus. Nullam ultricies pulvinar aliquam. Nunc scelerisque sed dui vitae bibendum.\n' +
        '\n' +
        'Fusce vel luctus elit. Praesent varius lacus ac dolor egestas rhoncus. In sed accumsan massa. Ut imperdiet felis ut lacus condimentum, ac eleifend enim rutrum. Proin pellentesque ligula eget suscipit semper. Vestibulum ultricies libero eget quam tempor placerat. Nam a dolor ornare, aliquam urna vitae, posuere mauris. Suspendisse pretium imperdiet dolor, nec mollis lectus efficitur eget. Nulla ultrices pretium ex eu tristique. Fusce augue lorem, mollis et velit sed, mattis volutpat leo. Donec euismod felis tellus, quis tincidunt arcu sagittis sit amet. Nulla eu pulvinar massa. Curabitur vel quam nec diam condimentum feugiat vel eget neque.\n' +
        '\n' +
        'Fusce ultrices enim ut rutrum viverra. Integer condimentum sodales magna, eget viverra magna ornare quis. Suspendisse non pretium neque, eu egestas nibh. Nunc tincidunt velit convallis mattis pulvinar. Vestibulum eget diam ultricies, aliquet neque eu, euismod risus. Sed viverra feugiat quam quis rutrum. Donec non scelerisque erat, laoreet blandit elit. Maecenas commodo leo eu tellus interdum fringilla. Donec eu semper lorem. Integer ac enim congue, tristique urna posuere, condimentum nulla. Quisque ultricies purus et libero semper ornare. Nunc consequat fermentum ullamcorper. Quisque maximus dui a pellentesque imperdiet.',
      shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\n' + 'Facere officiis inventore cumque tenetur laboriosam, minus\n' + 'culpa doloremque odio, neque molestias?',
      facebookLink: 'www.facebook.com',
      youtubeLink: 'www.youtube.com',
      instagramLink: 'www.instagram.com',
      tiktokLink: 'www.tiktok.com',
      linkedInLink: 'www.linkedin.com',
      rating: 3
    }
  ];
  }
}
