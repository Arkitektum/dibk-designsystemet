// dibk-designsystemet/layout - Every-Layout style layout primitives.
//
// A separate entry point rather than part of the main barrel, because these names
// are deliberately unprefixed and generic. The barrel does `export * from
// "@digdir/designsystemet-react"`, and a name exported by two star-exports is
// excluded from the re-export rather than shadowing one another, so an upstream
// release adding its own Grid or Stack would silently drop the export in every
// consuming app. Living on its own path means the namespaces never overlap.
export * from "./components/Layout";
