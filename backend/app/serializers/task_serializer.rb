class TaskSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :category_id

end
