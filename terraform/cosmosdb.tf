resource "azurerm_resource_group" "travel_diaries_rg" {
  name     = "travel_diaries_rg"
  location = "East US"
}

resource "azurerm_cosmosdb_account" "travel_diaries_db_acc" {
  name                = "travel-diaries-db-acc"
  location            = azurerm_resource_group.travel_diaries_rg.location
  resource_group_name = azurerm_resource_group.travel_diaries_rg.name
  offer_type          = "Standard"
  kind                = "MongoDB"
  
  geo_location {
    location          = "eastus"
    failover_priority = 1
  }

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }

  capabilities {
    name = "EnableMongo"
  }
}

resource "azurerm_cosmosdb_mongo_database" "travel_diaries_mongo_db" {
  name                = "travel-diaries-mongo-db"
  resource_group_name = azurerm_resource_group.travel_diaries_rg.name
  account_name        = azurerm_cosmosdb_account.travel_diaries_db_acc.name
}

resource "azurerm_cosmosdb_mongo_collection" "travel_diaries_mongo_collection" {
  name                = "travel-diaries-mongo-collection"
  resource_group_name = azurerm_resource_group.travel_diaries_rg.name
  account_name        = azurerm_cosmosdb_account.travel_diaries_db_acc.name
  database_name       = azurerm_cosmosdb_mongo_database.travel_diaries_mongo_db.name
}

output "cosmosdb_connection_string" {
  value = azurerm_cosmosdb_account.travel_diaries_db_acc.connection_strings[0]
}
