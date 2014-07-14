var sections = {all :        [  24995530, 24859302, 24812216, 24349448, 24213777, 24176582, 23818857, 23724086, 23613759, 23571589, 23558134, 23259572, 22864262, 22522955, 22186876,
                              23300833, 23082106, 21705601, 21793736, 21861847, 21565804,
                              21398548, 22174796, 20843733, 20565938, 20299126, 20105305,
                              19542273, 19716705, 19283063, 19015912, 19081724, 18366328,
                              17984072, 11825690, 11435081, 11011763, 9831592],
               selected :    [ 24213777, 23571589, 24176582, 22522955, 21793736, 21565804, 20299126],
               reviews :     [ 24213777, 22864262, 21861847, 20843733, 21861847, 19015912],
               firstauthor : [ 24812216, 24213777, 23724086, 23571589, 22522955, 21793736, 21565804, 20299126, 20565938]};

function add_article(item) {
    var author_list = '';
    for(var i = 0; i < item.AuthorList.length; i ++) {
          if(i != 0) {
               author_list += ', ';
          }
          author_list += item.AuthorList[i];
    }
    return '<p><a href=\'http://www.ncbi.nlm.nih.gov/pubmed/' + item.ArticleIds.pubmed + '\'>' + item.Title + '</a><br/>' + author_list + '<br/>' + item.FullJournalName + ' ' + item.PubDate + '</p>';
}

$(document).ready(function() {
	args = {'apikey' : '191d24f81e61c107bca103f7d6a9ca10',
		'db'     : 'pubmed',
		'id'     : sections.all.toString(),
		'retmax' : 100,          // maximum number of results from Esearch
		'max'    : 10,          // maximum number of results passed to Esummary
		'start'  : 0};
	$.getJSON('http://entrezajax.appspot.com/esummary?callback=?', args, function(data) {
		$.each(sections, function(section, pmids) {
			$.each(data.result, function(i, item) {
				if(jQuery.inArray(parseInt(item.ArticleIds.pubmed), pmids) != -1) {
					$("<div/>").html(add_article(item)).appendTo('#section_' + section);
				}
			});
		});
	});

	$('.section_text').hide();
	$('.section_click').click(function() {
		section = $(this).attr('href');
		$('.section_text').hide();
		$('#section_' + section).show();
		$('.section_click').css('font-weight', 'normal');
		$(this).css('font-weight', 'bold');
		return false;
	});

	$('#section_selected_click').trigger('click');
});
