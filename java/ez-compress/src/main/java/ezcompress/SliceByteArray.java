package ezcompress;

import java.util.Objects;

//A lightweight slice implementation for byte[]
public final class SliceByteArray
{
 public byte[] array; // array.length is the slice capacity
 public int length;
 public int index;


 public SliceByteArray()
 {
    this(new byte[0], 0, 0);
 }


 public SliceByteArray(byte[] array, int idx)
 {
     if (array == null)
        throw new NullPointerException("The array cannot be null");

     if (idx < 0)
        throw new NullPointerException("The index cannot be negative");

     this.array = array;
     this.length = array.length;
     this.index = idx;
 }


 public SliceByteArray(byte[] array, int length, int idx)
 {
     if (array == null)
        throw new NullPointerException("The array cannot be null");

     if (length < 0)
        throw new IllegalArgumentException("The length cannot be negative");

     if (idx < 0)
        throw new NullPointerException("The index cannot be negative");

     this.array = array;
     this.length = length;
     this.index = idx;
 }


 @Override
 public boolean equals(Object o)
 {
     try
     {
         if (o == null)
            return false;

         if (this == o)
            return true;

         SliceByteArray sa = (SliceByteArray) o;
         return ((this.array == sa.array)   &&
                 (this.length == sa.length) &&
                 (this.index == sa.index));
     }
     catch (ClassCastException e)
     {
         return false;
     }
 }


 @Override
 public int hashCode()
 {
    return Objects.hashCode(this.array);
 }


 @Override
 @SuppressWarnings("lgtm [java/print-array]")
 public String toString()
 {
     StringBuilder builder = new StringBuilder(100);
     builder.append("[ data=");
     builder.append(String.valueOf(this.array));
     builder.append(", len=");
     builder.append(this.length);
     builder.append(", idx=");
     builder.append(this.index);
     builder.append("]");
     return builder.toString();
 }


 public static boolean isValid(SliceByteArray sa)
 {
    if (sa == null)
       return false;

    if (sa.array == null)
       return false;

    if (sa.index < 0)
       return false;

    if (sa.length < 0)
       return false;

    return (sa.index <= sa.array.length);
 }
}
