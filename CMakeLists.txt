cmake_minimum_required(VERSION 3.19)
set(CMAKE_EXPORT_COMPILE_COMMANDS 1)

project(CMMCmanager VERSION 0.0.0 DESCRIPTION "A little standalone executable to manage CMMC data" LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

file(GLOB_RECURSE SRC src/* )

find_package(PkgConfig REQUIRED)
pkg_check_modules(GTK REQUIRED gtk4)
pkg_check_modules(sqlite3 REQUIRED sqlite3)

add_executable(${CMAKE_PROJECT_NAME} ${SRC})

add_subdirectory(vendor/spdlog)

target_link_libraries(${CMAKE_PROJECT_NAME} PRIVATE
  spdlog::spdlog
  ${GTK_LIBRARIES}
  ${sqlite3_LIBRARIES}
)

target_link_directories(${CMAKE_PROJECT_NAME} PRIVATE
  ${GTK_LIBRARY_DIRS}
  ${sqlite3_LIBRARY_DIRS}
)

target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE
  vendor/spdlog/include
  vendor/args
  ${GTK_INCLUDE_DIRS}
  ${sqlite3_INCLUDE_DIRS}
)

target_compile_options(${CMAKE_PROJECT_NAME} PRIVATE
  ${GTK_CFLAGS_OTHER}
  ${sqlite3_CFLAGS_OTHER}
)
