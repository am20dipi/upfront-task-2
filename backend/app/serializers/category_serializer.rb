class CategorySerializer
  include JSONAPI::Serializer
  attributes :name, :id
  has_many :tasks
end
