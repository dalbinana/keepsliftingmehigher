(function () {
	var bands = [
		"2UKGuGLvM4j4qbxaGslLWT",
		"1C4F7PHDaEkp5ZL1rkkmrE",
		"2Ynst7DZrEJnlaMM41ZCxd",
		"5bj2pIzyYR99GUinn9fKAN",
		"0Wn7tfH4rhaWTn8aMqSgh6",
		"2FfiPi1Ia6W1EWM1QcajDN",
		"0b4fqBfmPf9WoS1LVVKU7M",
		"7dl9xeD8jLQYMQyCfpK8TE",
		"5gInJ5P5gQnOKPM3SUEVFt",
		"53I53JqO0ELxsVxEu9v1p4",
		"31IVfzTQ5bAPL8XMrO6dVx",
		"0QDX6XPKMtHL54pzj5VG9T",
		"1qYyfVCh404G4yUnVWr72I",
		"7eaGUzCmUeHYU4qssZoSai",
		"4JiOObzTWLYWJwH65qgfFK",
		"0ypZZtxEt7WJHjFIof8qWi",
		"61ds8TIzczgKxyrfs3SrvW",
		"5XnP676dN3L7JaeM4gvd9C",
		"4MyvYS9VHWAB4ArEMOotV1",
		"4FPmAi3p4T3p0AsthfqHMA",
		"611NVXVJTiwXIQ4mtlKrp4",
		"3ytMiTBG7TnAOsA3Ql7eAs",
		"5s6yhwwSSPsUSFcYrxNXpv",
		"4dsqiX7DwmvBXNh1DrYKtZ",
		"4nph7bHoQr1ixTyjuU8ctB",
		"1N6pWvPzTfNRdHBDoCTtQ8",
		"59fMjqzT9fvTLoGbWJZ6vA",
		"3XwQ3Mhn4CY3flPIXUuTv6",
		

		]


	var preOrderedBands = [];
	var orderedBands = [];
		
	var Spotify = window.KeepsLiftingMe.Spotify = function () {	
	};
	///send the bands to the fetcher
	Spotify.prototype.prepareBands = function() {
		bands.forEach(spoti.fetchBands);
		/////AQUÏ ES ON HAURIA DE PASSAR L?ARRAY DE PREORDERES A RENDER, A L'ACABAR EL FOREACH

	};

	Spotify.prototype.fetchBands = function(id) {
		$.ajax({
	    type: 'GET',
	    url: 'https://api.spotify.com/v1/artists/' + id,
	    success: spoti.prepareForRenderBands.bind(this),
	    error: function () {
	      console.log('Some error!');
	    }
	  });
	};

	Spotify.prototype.prepareForRenderBands = function(band) {
		var name = band.name;
		var picture = band.images[0].url;
		var popularity = band.popularity;
		var id = band.id;
		preOrderedBands.push({id: id,name: name, picture: picture, popularity: popularity}); 
		if (preOrderedBands.length === bands.length) {
			
			orderedBands=spoti.orderBands(preOrderedBands, 'popularity');
			spoti.renderBands();
		}

		

			
	};

	Spotify.prototype.orderBands = function(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return ((x < y) ? 1 : ((x > y) ? -1 :0));
		});	
	};

	Spotify.prototype.renderBands = function(){	
		for (i=0; i < orderedBands.length; i++){
			var item = orderedBands[i]	
		// $('.spoticontent').append('<tr class="table_rows"><td><div class="picture_bands"style="background-image:url("'+item.picture+'");"></div></td><td class="band_name">'+item.name+'</td><td class="popularity">'+item.popularity+'</td><td class="view_more">View more</td> </tr>');
		$('.spoticontent').append('<tr class="table_rows"><td><div class="picture_bands img-circle"> <img src='+item.picture+'> </div></td><td class="band_name">'+item.name+'</td><td class="popularity">'+item.popularity+'</td><td class="view_more material-icons md-48" data-toggle="modal" data-target="#myModal" id="'+item.id+'">list</td> </tr>');
		};
		$('.view_more').on('click', spoti.fetchSongs.bind(this));
	};

	Spotify.prototype.fetchSongs = function(e,country){
		var id=event.currentTarget.id;
		var country=country || "ES"
		$.ajax({
	    type: 'GET',
	    url: 'https://api.spotify.com/v1/artists/'+id+'/top-tracks?country='+country,
	    success: spoti.renderSongs.bind(this),
	    error: function () {
	      console.log('Some error!');
	    }
	  });
	};

	Spotify.prototype.renderSongs = function(songs) {
		var eachSong = songs.tracks;
		$('.list_of_songs').html("");
		
		
		for (i = 0; i < eachSong.length; i++) { 
    	$('.list_of_songs').append('<tr class="table_rows"> <td class="song_name">'+eachSong[i].name+'</td><td class "popularity">'+eachSong[i].popularity+'</td><td class="listen material-icons md-48"><a href="'+eachSong[i].external_urls.spotify+'" target="_blank">play_circle_filled</td></tr>');
		}



	}



	

	






	var spoti = new Spotify();
	spoti.prepareBands();
	
	 
	
	 
	
})();
