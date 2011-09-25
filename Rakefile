
require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

require 'json'
require 'uglifier'

LICENSE = <<-END
/*!
* jQuery Cover
* https://github.com/inukshuk/jquery.cover.js
*
* Copyright 2011, Sylvester Keil, Johannes Krtek.
* Distributed under the MIT license.
* https://github.com/inukshuk/jquery.cover.js/blob/master/LICENSE
*
* Date: #{ Time.now.to_s }
*/
END

task :minify do
  File.open('jquery.cover.min.js', 'w') do |f|
    f.puts LICENSE
    f.puts Uglifier.new.compile(File.open('src/cover.js', 'r:UTF-8').read)
  end
end
