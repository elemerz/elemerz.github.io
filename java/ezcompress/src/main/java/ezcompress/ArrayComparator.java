package ezcompress;

public interface ArrayComparator {
    // Given an array (not provided here), return how the
    // sub-array starting at lidx compares to that starting at ridx
    public int compare(int lidx, int ridx);
}