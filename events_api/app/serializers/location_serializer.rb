class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :parent_name

  def parent_name
    pn = self.object.parent
    return pn.nil? ? nil : pn.name
  end
  
end
