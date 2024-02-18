install.packages("rjson", repos = "https://mirror.las.iastate.edu/CRAN/")
install.packages("RJSONIO", repos = "https://mirror.las.iastate.edu/CRAN/")
library(jsonlite)
    library("rjson")
json_file <- "/Users/conniely/TREEHACKS2024/TreeHacks2024/treehacks/soildata.json"
json_data <- fromJSON(paste(readLines(json_file), collapse=""))

x = json_data
print(paste("Received Soil pH:", x))

# Assuming json_data has been read and processed as shown in your script
x = json_data
    #x = 5
    if (json_data < 6.0 || json_data< 6.8) {
      result <- print("Given these conditions, we recommend planting this crop")
    } else {
      result <-print("Given these conditions, we do not recommend planting this crop")
    }

    getwd()
    setwd("/Users/conniely/TREEHACKS2024/TreeHacks2024/treehacks/resultsR")
   

    rec <- toJSON(result)
    write_json(rec, "/Users/conniely/TREEHACKS2024/TreeHacks2024/treehacks/resultsR/rec.json")









