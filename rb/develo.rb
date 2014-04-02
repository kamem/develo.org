require "sass"

module Develo
    def isFile(fileName)
		path = fileName.value
		Sass::Script::String.new(FileTest.exist?(path).to_s)
    end

	def fileList(dir,isDir = true)
		array = []
		dirs = Dir.glob(dir.value)
		dirs.each_with_index do |li,i|
			
			if isDir == true then
				file = li
			else
				file = File.basename(li)
			end
			
			array[i] = Sass::Script::String.new("#{file}")
		end
		Sass::Script::List.new(array,',')
	end
	
	def sqrt(x)
		numeric_transformation(x){|value| Math::sqrt(value)}
	end
end

module Sass::Script::Functions
    include Develo
end